"use client"
import { useState } from "react";
import { initiateTransfer } from "../app/lib/actions/initiateTransfer";
import { Button } from "./src/button";
import { Card } from "./src/card";
import { TextInput } from "./src/TextInput";

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
              setLoading(true)
              await initiateTransfer(amount * 100, phoneNumber)   
              window.location.reload(); 
              setLoading(false)
            }} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Send Money
            </Button>
        </div>
  </div>
</Card>
}