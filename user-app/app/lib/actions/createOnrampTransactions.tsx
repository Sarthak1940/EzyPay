"use server"
import { getServerSession } from "next-auth"
import { AUTH_CONFIG } from "../auth"
import prisma from "@/db";
import axios from "axios";

export const createOnrampTransactions = async (provider: string, amount: number) => {
  const session = await getServerSession(AUTH_CONFIG);
  const userId: string = session?.user?.id

  if (!userId) {
    return {
      message: "User not authenticated"
    }
  }
  const token = Date.now().toString()

    await prisma.onRampTransaction.create({
      data: {
        status: "Processing",
        provider: provider || "",
        amount: amount,
        userId: userId,
        token: token,
        startTime: new Date()
    }
  })

  webhookHandler(token, userId, amount)

  return {
    message: "Done"
  }
}

async function webhookHandler(token: string, userId: string, amount: number) {
  try {
    await axios.post("https://bank-webhook.triumphinfluence.workers.dev/hdfcWebhook", {
      token: token,
      userId: userId,
      amount: amount.toString()
    })
  } catch (error) {
    console.log("Error while getting money", error);
    
  }
}