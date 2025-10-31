"use client"
import { useState } from "react";
import { initiateTransfer } from "../app/lib/actions/initiateTransfer";
import { Button } from "./src/button";
import { Card } from "./src/card";
import { TextInput } from "./src/TextInput";
import toast from "react-hot-toast";

export const TransferMoney = () => {

  const [amount, setAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false)

    
  return <Card title="Send Money" className="max-h-fit">
  <div className="w-full">

      <TextInput label={"Phone Number"} placeholder="1234567890" onChange={(val) => {
        setPhoneNumber(val);
      }}/>

      <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
          setAmount(Number(val));
      }} />

      <div className="flex justify-center pt-4">  
            <Button onClick={async () => {
              if (!phoneNumber) {
                toast.error("Please enter a phone number")
                return
              }
              if (!amount || amount <= 0) {
                toast.error("Please enter a valid amount")
                return
              }
              
              setLoading(true)
              try {
                const result = await initiateTransfer(amount * 100, phoneNumber)
                
                if (result?.message === "User not authenticated") {
                  toast.error("You must be logged in to transfer money")
                  setLoading(false)
                  return
                }
                
                if (result?.message === "Insufficient funds") {
                  toast.error("Insufficient funds")
                  setLoading(false)
                  return
                }
                
                toast.success("Transfer initiated successfully!")
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              } catch (error: any) {
                console.log("Error transferring money", error);
                toast.error(error?.message || "Failed to transfer money. Please try again.")
                setLoading(false)
              }
            }} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Send Money
            </Button>
        </div>
  </div>
</Card>
}