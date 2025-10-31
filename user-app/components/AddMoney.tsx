"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOnrampTransactions } from "../app/lib/actions/createOnrampTransactions";
import { Button } from "./src/button";
import { Card } from "./src/card";
import { Select } from "./src/Select";
import { TextInput } from "./src/TextInput";
import toast from "react-hot-toast";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];



export const AddMoney = () => {
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false)

    async function handleMoney(redirectUrl: string | undefined, provider: string, amount: number) {
        if (!amount || amount <= 0) {
            toast.error("Please enter a valid amount")
            return
        }
        
        try {
            setLoading(true)
            const result = await createOnrampTransactions(provider, amount * 100)
            
            if (result?.message === "User not authenticated") {
                toast.error("You must be logged in to add money")
                setLoading(false)
                return
            }
            
            toast.success(`Redirecting to ${provider}...`)
            // Refresh immediately to show the new transaction
            router.refresh();
            
            // Refresh again after a delay to capture the balance update from the webhook
            setTimeout(() => {
                router.refresh();
            }, 2000);
            
            setTimeout(() => {
                window.open(redirectUrl || "", "_blank");
            }, 500)
            setLoading(false)
        } catch (error) {
            console.log("Error creating transaction", error);
            toast.error("Failed to initiate transaction. Please try again.")
            setLoading(false)
        }    
    }
    
    return <Card title="Add Money" className="">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setAmount(Number(val));
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => handleMoney(redirectUrl, provider, amount)} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Add Money
            </Button>
        </div>
    </div>
</Card>
}