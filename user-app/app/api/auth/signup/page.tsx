"use client"
import Image from "next/image";
import { useState } from "react";
import { createAccount } from "@/app/lib/actions/createAccount";
import { useRouter } from "next/navigation";
import { Card } from "@/components/src/card";
import { TextInput } from "@/components/src/TextInput";
import { Button } from "@/components/src/button";
import toast from "react-hot-toast";

export default function () {
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return <div className="flex gap-20 justify-center items-center mx-auto mt-12 w-[70%]">
    <div className="hidden lg:block">
      <Image src="/signup-image.webp" alt="" width={400} height={400}></Image>
    </div>

    <div>
      <p className="text-[2rem] sm:[2.5rem] md:text-[2.5rem] leading-[100%] -tracking-[0.1rem] mb-5 font-sans">Create your personal account</p>

      <Card title="Enter your Details" className="max-h-fit">
        <div>
          <TextInput label="Full Name" placeholder="satoshi nakamoto" onChange={(val) => {
            setName(val)
          }}></TextInput>

          <TextInput label="Email" placeholder="satoshi@email.com" onChange={(val) => {
            setEmail(val)
          }}></TextInput>

          <TextInput label="Phone Number" placeholder="1234567890" onChange={(val) => {
            setNumber(val)
          }}></TextInput>

          <TextInput label="Password" type="password" placeholder="1234567890" onChange={(val) => {
            setPassword(val)
          }}></TextInput>

          <div className="flex justify-center pt-4">
            <Button onClick={async () => {
              if (!name || !email || !number || !password) {
                toast.error("Please fill in all fields")
                return
              }
              setLoading(true)
              try {
                await createAccount(number, password, name, email)
                toast.success("Account created successfully!")
                setTimeout(() => {
                  router.push("/dashboard")
                }, 1000)
              } catch (error: any) {
                toast.error(error?.message || "Failed to create account. Please try again.")
              }
              setLoading(false)
            }} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Create Account
            </Button>
          </div>

        </div>
      </Card>
    </div>
  </div>
}