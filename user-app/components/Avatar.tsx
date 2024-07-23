import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const Avatar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

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
    <div onClick={() => setDropdownOpen(!dropdownOpen)} className="avatar relative w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600 cursor-pointer">
      <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
    </div>
  
  <div className={`dropdown z-10 bg-white  rounded-lg shadow w-44 absolute right-1 ${dropdownOpen ? "block": "hidden"}`}>
      <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
        <li className="block sm:hidden">
          <a href="/dashboard" onClick={(e) => e.stopPropagation()}
          className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
        </li>
        <li className="block sm:hidden">
          <a href="/deposit" onClick={(e) => e.stopPropagation()}
          className="block px-4 py-2 hover:bg-gray-100">Deposit</a>
        </li>
        <li className="block sm:hidden">
          <a href="/transfer" onClick={(e) => e.stopPropagation()}
          className="block px-4 py-2 hover:bg-gray-100">Transfer</a>
        </li>
        <li className="block sm:hidden">
          <a href="/transaction" onClick={(e) => e.stopPropagation()}
          className="block px-4 py-2 hover:bg-gray-100">Transaction</a>
        </li>
        <li>
          <a href="/dashboard" onClick={(e) => e.stopPropagation()}
           className="block px-4 py-2 hover:bg-gray-100">Settings</a>
        </li>
      </ul>
      <div className="py-1 border-t">
        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" 
        onClick={async () => {
          await signOut()
          router.push("/api/auth/signin")
          }}>
          Sign out
        </div>
      </div>
  </div>
</div> 
  
}