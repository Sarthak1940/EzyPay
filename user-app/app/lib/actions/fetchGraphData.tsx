"use server"
import prisma from "@/db";
import { getServerSession } from "next-auth"
import { AUTH_CONFIG } from "../auth"

export const fetchGraphData = async () => {
    const session = await getServerSession(AUTH_CONFIG)
    const userId = session?.user?.id
    const data: { dates: string[]; values: number[]; balances: number[] } = {
        dates: [],
        values: [],
        balances: []
    }
    
    // Get all onramp transactions sorted by time
    const onrampTransactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            startTime: 'asc'
        }
    })
    
    // Get all P2P transactions sorted by time to calculate balance accurately
    const sentTransactions = await prisma.p2PTransaction.findMany({
        where: {
            fromUserId: userId
        },
        orderBy: {
            startTime: 'asc'
        }
    })
    
    const receivedTransactions = await prisma.p2PTransaction.findMany({
        where: {
            toUserId: userId
        },
        orderBy: {
            startTime: 'asc'
        }
    })
    
    // Combine all transactions and sort chronologically
    interface Transaction {
        time: Date;
        type: 'onramp' | 'sent' | 'received';
        amount: number;
        status: string;
    }
    
    const allTransactions: Transaction[] = [
        ...onrampTransactions.map(t => ({
            time: t.startTime,
            type: 'onramp' as const,
            amount: t.amount,
            status: t.status
        })),
        ...sentTransactions.map(t => ({
            time: t.startTime,
            type: 'sent' as const,
            amount: t.amount,
            status: t.status
        })),
        ...receivedTransactions.map(t => ({
            time: t.startTime,
            type: 'received' as const,
            amount: t.amount,
            status: t.status
        }))
    ].sort((a, b) => a.time.getTime() - b.time.getTime())
    
    // Create a map to store balance at each onramp transaction time
    const balanceAtOnrampTime: Map<number, number> = new Map()
    let runningBalance = 0
    
    // Calculate balance at each onramp transaction point
    // Process all transactions chronologically and track balance at onramp transaction times
    for (const transaction of allTransactions) {
        if (transaction.type === 'onramp') {
            // For onramp transactions, store balance before processing
            // If successful, we'll update it after; if not, this is the correct balance
            balanceAtOnrampTime.set(transaction.time.getTime(), runningBalance)
            
            // If successful, update balance and overwrite the stored value
            if (transaction.status === 'Success') {
                runningBalance += transaction.amount
                balanceAtOnrampTime.set(transaction.time.getTime(), runningBalance)
            }
        } else if (transaction.type === 'sent' && transaction.status === 'Success') {
            runningBalance -= transaction.amount
        } else if (transaction.type === 'received' && transaction.status === 'Success') {
            runningBalance += transaction.amount
        }
    }
    
    // Build the data array for onramp transactions
    onrampTransactions.forEach(transaction => {
        data.dates.push(transaction.startTime.toISOString())
        data.values.push(transaction.amount / 100)
        
        // Get the balance at the time of this onramp transaction
        const balance = balanceAtOnrampTime.get(transaction.startTime.getTime()) || 0
        data.balances.push(balance / 100)
    })
    
    return data
}