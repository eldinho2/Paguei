import { redirect } from 'next/navigation'
import Header from '../components/Header'
import Main from '../components/Main'

export default async function Home() {

  return (
    <div className=''>
      <Header />
      <Main />
    </div>
  )
}
