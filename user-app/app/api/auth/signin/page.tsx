"use client"
import { Button } from "@/components/src/button"
import { Card } from "@/components/src/card"
import { TextInput } from "@/components/src/TextInput"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"

export default function () {
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  return <div className="flex gap-20 justify-center mx-auto mt-12 w-[60%]">
    <div className="hidden lg:block">
      <Image src="/signup-image.webp" alt="" width={600} height={600}></Image>
    </div>

    <div className="w-full">
      <Card title="Enter your Details" className="max-h-fit">
        <div>
          <TextInput label="Phone Number" placeholder="1234567890" onChange={(val) => {
            setNumber(val)
          }}></TextInput>

          <TextInput label="Password" type="password" placeholder="1234567890" onChange={(val) => {
            setPassword(val)
          }}></TextInput>

          <div className="flex justify-center pt-4">
            <Button onClick={async () => {
              if (!number || !password) {
                toast.error("Please enter both phone number and password")
                return
              }
              setLoading(true)
              try {
                const result = await signIn("credentials", {
                  phone: Number(number),
                  password: password,
                  callbackUrl: "/dashboard",
                  redirect: false
                })
                if (result?.error) {
                  toast.error("Invalid credentials. Please try again.")
                } else if (result?.ok) {
                  toast.success("Signed in successfully!")
                  setTimeout(() => {
                    window.location.href = "/dashboard"
                  }, 500)
                }
              } catch (error) {
                toast.error("An error occurred. Please try again.")
              }
              setLoading(false)
            }} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Sign in
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
}


