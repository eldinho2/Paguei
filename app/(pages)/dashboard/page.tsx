import { auth } from "@/lib/auth"
import LogoutBtn from "@/components/LogoutBtn"
export default async function Dashboard() {
  const session = await auth()
  if (session?.user) {
    console.log(session.user);
  }

  return (
   <div>
      {session?.user?.email}
      <div>
        <LogoutBtn />
      </div>
   </div>
  )
}
