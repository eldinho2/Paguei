'use client'

import { signOut } from "next-auth/react"

export default function LogoutBtn () {
  return (
    <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })} className="py-2 px-4 rounded border-2 border-white/50 text-red-400">Sair</button>
  )
}