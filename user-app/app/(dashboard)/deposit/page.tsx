import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { Transactions } from "../../../components/Transactions";
import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "../../lib/auth";
import prisma from "@/db";

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

async function getOnRampTransactions() {
    const session = await getServerSession(AUTH_CONFIG);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        transfer: "recieve"
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 px-6 mb-8 font-bold">
            Deposit
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <Transactions transactions={transactions} title="Recent Transactions"/>
                </div>
            </div>
        </div>
    </div>
}