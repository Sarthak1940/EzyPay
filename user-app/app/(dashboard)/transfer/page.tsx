import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import prisma from "@/db";
import { AUTH_CONFIG } from "../../lib/auth";
import { TransferMoney } from "../../../components/TransferMoney";


async function getBalance() {
  const session = await getServerSession(AUTH_CONFIG);
  const balance = await prisma.balance.findFirst({
      where: {
          userId: session?.user?.id
      }
  });
  return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
  }
}

export default async function() {
  const balance = await getBalance();
  
  return <div className="w-screen">
  <div className="text-4xl text-[#6a51a6] pt-8 px-6 mb-8 font-bold">
      Send Money
  </div>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
      <div>
          <TransferMoney />
      </div>
      <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
  </div>
</div>
}