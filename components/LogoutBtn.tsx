'use client'

import { signOut } from "next-auth/react"

export default function LogoutBtn () {
  return (
    <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Sair</button>
  )
}