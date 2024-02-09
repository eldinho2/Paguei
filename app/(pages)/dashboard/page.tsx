import Header from '@/components/Header'
import Main from '@/components/Main'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    console.log('session user pge.tsx', session)
    redirect('/login')
  }

  return (
    <div className=''>
      <Header />
      <Main />
    </div>
  )
}
