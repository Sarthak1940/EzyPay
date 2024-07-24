"use client"
import { Button } from "@/components/src/button"
import { Card } from "@/components/src/card"
import { TextInput } from "@/components/src/TextInput"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function () {
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
              setLoading(true)
              await signIn("credentials", {
                phone: Number(number),
                password: password,
                callbackUrl: "/dashboard"
              })
              setLoading(false)
            }} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Sign in
            </Button>
          </div>
          
          <div className="flex items-center justify-center">
            <button className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            onClick={async () => {
              setLoading(true)
              await signIn("google")
              setLoading(false)
              router.push("/dashboard")
              
            }}>
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" width={24} height={24}/>
                Login with Google
            </button>
          </div>
        </div>
      </Card>
    </div>
  </div>
}


