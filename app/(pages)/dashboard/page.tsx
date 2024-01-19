import { auth } from "@/lib/auth"
import LogoutBtn from "@/components/LogoutBtn"
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Main from '@/components/Main'

export default async function Dashboard() {

  const session = await auth()

  if (!session?.user) {
    console.log(session);
    redirect('/dashboard')
  }

  return (
    <div className=''>
      <LogoutBtn />
      <Header />
      <Main />
    </div>
  )
}
