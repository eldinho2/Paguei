import { redirect } from "next/navigation"

export default async function Home() {
  redirect("/login")
  return (
    <div className=''>
      index
    </div>
  )
}
