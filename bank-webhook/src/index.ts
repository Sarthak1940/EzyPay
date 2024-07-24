import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();


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
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());


  const {token, userId, amount} = await c.req.json<PaymentInformation>()
  console.log("userId: "+userId+" amount: "+amount+" token: "+token);
  

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

    return c.json({
        message: "Captured"
    })
  } catch(e) {
    console.error(e);
    c.status(411)
    return c.json({
        message: "Error while processing webhook"
    })
  } 
    
})


export default app
