"use server"
import prisma from "@/db";
import { getServerSession } from "next-auth"
import { AUTH_CONFIG } from "../auth"

export const initiateTransfer = async (amount: number, phoneNumber: string) => {
    const session = await getServerSession(AUTH_CONFIG)

    if (!session?.user.id) {
      return {
        message: "User not authenticated"
      }
    } 

    const toUser = await prisma.user.findFirst({
      where: {
        number: phoneNumber
      }
    })
  
    if (!toUser) {
      throw new Error("User not found: " + phoneNumber)
    }

    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(session.user.id)} FOR UPDATE`;

      const balance = await tx.balance.findFirst({
        where: {
          userId: session.user.id
        }
      });
  
      if (!balance || balance.amount < amount) {
        return {
          message: "Insufficient funds"
        }
      };

      await tx.balance.update({
       where: {
         userId: toUser.id
       },
       data: {
         amount: {
           increment: amount
         }
       }
      });

      await tx.balance.update({
        where: {
          userId: session.user.id
        },
        data: {
          amount: {
            decrement: amount
          }
        }
      });
      
      await tx.p2PTransaction.create({
        data: {
          fromUserId: session?.user?.id,
          status: "Processing",
          amount: amount,
          startTime: new Date(),
          toUserId: toUser.id
        }
      })
  })
}