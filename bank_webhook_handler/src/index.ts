import express from "express"
import { PrismaClient } from "@prisma/client";
import cors from "cors"

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://ezy-pay-frontend.vercel.app",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))

const prisma = new PrismaClient();

interface PaymentInformation {
  token: string;
  user_id: string;
  amount: string;
}

app.get("/", (req, res) => {
  res.json({
    message: "Hello, World!"
  })
})
app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: PaymentInformation = {
    token: req.body.token,
    user_id: req.body.user_identifier,
    amount: req.body.amount,
  }
  

  try {
    await prisma.$transaction([
        prisma.balance.update({
            where: {
                userId: paymentInformation.user_id
            },
            data: {
                amount: {
                    increment: Number(paymentInformation.amount)
                }
            }
        }),
        prisma.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Success",
            }
        })
    ]);

    res.json({
        message: "Captured"
    })
  } catch(e) {
    console.error(e);
    res.status(411).json({
        message: "Error while processing webhook"
    })
  } 
    
})

app.listen(3003)