"use client"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export const Avatar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const session = useSession()

  useEffect(() => {

    const handleOutsideClick = (event: any) => {
       // Check if dropdown is open and if the click is outside the dropdown
      if (dropdownOpen && !event.target.closest(".avatar")  && !event.target.closest('.dropdown')) {
        setDropdownOpen(false)
      }
    }
     // Adding event listener on mount
    document.addEventListener('mousedown', handleOutsideClick)
     // Clean up event listener on unmount
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [dropdownOpen])

  return <div className="relative">
    <div 
      onClick={() => setDropdownOpen(!dropdownOpen)} 
      className={`avatar relative w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600 cursor-pointer transition-all duration-200 flex items-center justify-center ${
        dropdownOpen ? 'ring-2 ring-gray-400 ring-offset-2 ring-offset-white scale-105' : 'hover:scale-105 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
      }`}
    >
      <svg 
        className="absolute w-12 h-12 text-gray-400 -left-1 transition-transform duration-200" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
      </svg>
    </div>
  
    <div 
      className={`dropdown z-10 bg-white rounded-lg shadow-lg w-48 absolute right-0 mt-2 border border-gray-100 overflow-hidden transition-all duration-200 ${
        dropdownOpen 
          ? "opacity-100 translate-y-0 pointer-events-auto block" 
          : "opacity-0 -translate-y-2 pointer-events-none hidden"
      }`}
    >
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <p className="text-sm font-medium text-gray-700 truncate">
          {session.data?.user?.name || 'User'}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 truncate">
          {session.data?.user?.email}
        </p>
      </div>
      
      <ul className="py-1.5 text-sm text-gray-700" aria-labelledby="avatarButton">
        <li className="block sm:hidden">
          <a 
            href="/dashboard" 
            onClick={(e) => e.stopPropagation()}
            className="block px-4 py-2.5 hover:bg-gray-100 transition-colors duration-150"
          >
            Dashboard
          </a>
        </li>
        <li className="block sm:hidden">
          <a 
            href="/deposit" 
            onClick={(e) => e.stopPropagation()}
            className="block px-4 py-2.5 hover:bg-gray-100 transition-colors duration-150"
          >
            Deposit
          </a>
        </li>
        <li className="block sm:hidden">
          <a 
            href="/transfer" 
            onClick={(e) => e.stopPropagation()}
            className="block px-4 py-2.5 hover:bg-gray-100 transition-colors duration-150"
          >
            Transfer
          </a>
        </li>
        <li className="block sm:hidden">
          <a 
            href="/transaction" 
            onClick={(e) => e.stopPropagation()}
            className="block px-4 py-2.5 hover:bg-gray-100 transition-colors duration-150"
          >
            Transaction
          </a>
        </li>
        <li className="block sm:hidden">
          <a 
            href="/dashboard" 
            onClick={(e) => e.stopPropagation()}
            className="block px-4 py-2.5 hover:bg-gray-100 transition-colors duration-150"
          >
            Settings
          </a>
        </li>
      </ul>
      
      <div className="py-1 border-t sm:border-t-0 border-gray-200">
        <div 
          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-150" 
          onClick={async () => {
            toast.success("Signing out...")
            await signOut()
            setTimeout(() => {
              router.push("/api/auth/signin")
            }, 500)
          }}
        >
          Sign out
        </div>
      </div>
    </div>
  </div> 
  
}