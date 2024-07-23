import { getServerSession } from "next-auth";
import { Transactions } from "../../../components/Transactions";
import prisma from "@/db";
import { AUTH_CONFIG } from "../../lib/auth";


async function getP2PTransaction() {
  const session = await getServerSession(AUTH_CONFIG)
  const loggedInUserId = session?.user?.id
  const txns = await prisma.p2PTransaction.findMany({
      where: {
         fromUserId: loggedInUserId
      }
  })

  return txns.map(t => {
      if(t.toUserId !== loggedInUserId) {
          return {
              time: t.startTime,
              amount: t.amount,
              status: t.status,
              provider: "",
              transfer: "send"
          }
      }      
      return {
          time: t.startTime,
          amount: t.amount,
          status: t.status,
          provider: "",
          transfer: "recieve"
      }
  })
}

export default async function () {
    const transactions = await getP2PTransaction()
    const sentTransactions = transactions.filter(t => t.transfer === "send")
    const recievedTransactions = transactions.filter(t => t.transfer === "recieve")
    
  return <div className="w-screen">
  <div className="text-4xl text-[#6a51a6] pt-8 px-6 mb-8 font-bold">
      P2P Transactions
  </div>
  <div className="gap-4 p-4">
      <div className="pt-4">
          <Transactions transactions={recievedTransactions} title="Money Recieved"/>
          <Transactions transactions={sentTransactions} title="Money Sent"/>
      </div>
  </div>
</div>
}