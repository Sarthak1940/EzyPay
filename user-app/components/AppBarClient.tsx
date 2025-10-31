"use client"
import {  useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { List } from "./List"
import React, { useState } from "react"
import { Avatar } from "./Avatar"
import { Button } from "./src/button"

export const AppBarClient = () => {
  const session = useSession()
  const pathname = usePathname()
  const router = useRouter()

  if(session.data?.user) {
    return <div>
    <Appbar>
        <Button onClick={() =>{router.push(pathname === "/dashboard" ? "/deposit" : "/dashboard")}} disabled={false} colour="bg-[#855bfb29] 
        text-[#7132f5] hidden sm:block">{pathname === "/dashboard" ? "Deposit" : "Home"}</Button>
        <Avatar/>
    </Appbar>
  </div>
  }

  if (pathname === "/api/auth/signup") {
    return <div>
    <Appbar>
        <Button onClick={() => {router.push("/api/auth/signin")}} disabled={false} colour="bg-[#855bfb29] text-[#7132f5]">Sign in</Button>
    </Appbar>
  </div>
  }

  if (pathname === "/api/auth/signin") {
    return <div>
    <Appbar>
        <Button onClick={() => {router.push("/api/auth/signup")}} disabled={false} colour="bg-[#855bfb29] text-[#7132f5]">Create Account</Button>
    </Appbar>
  </div>
  }
  
  if (pathname === "/") {
    return <div>
    <Menu/>
  </div>
  }
  } 


function Appbar({children}: {children: React.ReactNode})  {
  return <div className="flex justify-between border-b py-2 px-4 border-slate-300">
      <div className="text-3xl flex flex-col justify-center text-[#7132f5] font-sans">
          <a href="/">EzyPay</a>
      </div>
      <div className="flex justify-center pt-2 gap-4">
          {children}
      </div>
  </div>
}


function Menu() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)


  return <nav className="border-gray-200 bg-[#7132f5]">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="flex flex-col justify-center text-white text-3xl">
       <a href="/">EzyPay</a>
    </div>

    <div className="hidden lg:block">
      <List/>
    </div>

    <div className="justify-center pt-2 gap-4 hidden lg:flex">
      <Button onClick={() =>{router.push("/api/auth/signin")}} disabled={false} colour="text-white bg-[#7132f5] hover:bg-[#6a51a6] outline outline-1">Sign in</Button>
      <Button onClick={() => {router.push("/api/auth/signup")}} disabled={false} colour="bg-white hover:bg-[#fffdd0] text-[#7132f5]">Sign up</Button>
    </div>
    
    <button data-collapse-toggle="navbar-hamburger" type="button" className="lg:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-white rounded-lg" 
    onClick={() => setMenuOpen(!menuOpen)}>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div className={`w-full ${menuOpen ? "block" : "hidden"}`}>
      <ul className="flex flex-col font-medium mt-4 rounded-lg">
        <li>
          <a href="/api/auth/signup" className="block py-2 px-3 text-gray-900 hover:text-white">Signup</a>
        </li>
        <li>
          <a href="/api/auth/signin" className="block py-2 px-3 text-gray-900 hover:text-white">Signin</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 hover:text-white">Explore</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 hover:text-white">Pay and Recieve</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 hover:text-white">Pay with EzyPay</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 hover:text-white">Support</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
}