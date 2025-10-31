import { Card } from "./src/card"

export const Transactions = ({
    transactions, title
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string,
        transfer: string
    }[],
    title:string
}) => {

    if (!transactions.length) {
        return <Card title={title} className="max-h-fit mt-4">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title={title} className="h-64 mt-4">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.transfer === "send" ? "Sent INR": "Recieved INR"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.transfer === "send"? `- Rs ${t.amount / 100}`: `+ Rs ${t.amount / 100}`}
                </div>

            </div>)}
        </div>
    </Card>
}