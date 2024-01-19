import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth"


export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()  

  return(
    <SessionProvider session={session}>
      <section className="p-2 flex flex-col justify-center items-center h-screen">{children}</section>
    </SessionProvider>
      )

}