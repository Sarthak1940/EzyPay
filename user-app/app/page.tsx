import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { AUTH_CONFIG } from "./lib/auth";
import { LandingPage } from "@/components/LandingPage";

export default async function Page() {
  const session = await getServerSession(AUTH_CONFIG);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    return <div>
      <LandingPage/>
    </div>
  }
}
