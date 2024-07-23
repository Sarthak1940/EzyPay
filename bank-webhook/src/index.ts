import { Hono } from 'hono'
import { cors } from 'hono/cors';
import {PrismaClient} from "@prisma/client"

const app = new Hono();
const prisma = new PrismaClient();

app.use(cors({
  origin: "https://ezy-pay-frontend.vercel.app",
  allowMethods: ["POST"],
  allowHeaders: ["Content-Type","Authorization"]
}))


interface PaymentInformation {
  token: string;
  userId: string;
  amount: string;
}


app.post("/hdfcWebhook", async (c) => {
  const {token, userId, amount} = await c.req.json<PaymentInformation>()
  

  try {
    await prisma.$transaction([
        prisma.balance.update({
            where: {
                userId
            },
            data: {
                amount: {
                    increment: Number(amount)
                }
            }
        }),
        prisma.onRampTransaction.update({
            where: {
                token
            }, 
            data: {
                status: "Success",
            }
        })
    ]);

    c.json({
        message: "Captured"
    })
  } catch(e) {
    console.error(e);
    c.status(411)
    c.json({
        message: "Error while processing webhook"
    })
  } 
    
})


export default app
