'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"

type getFunctionProps = {
  newToken: string
  email: string
}

export async function getFunction(newToken, email) {  try {
    const response = await axios.get(`https://paguei-back-end.onrender.com/expenses/get-all-expenses/${email}`, {  
      headers: {
          Authorization: `Bearer ${newToken}`,
        },
    })
    

    const expenses = response.data.result

    if (!expenses || expenses.length === 0) {
      return []
    }

    return expenses
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetExpenses() {
  const { data: session } = useSession()
  const token = session?.user.accessToken
  const email = session?.user.email
  const [newToken, setNewToken] = useState<string | undefined>(token)

  useEffect(() => {
    const checkToken = async () => {
      const updatedToken = await JwtIsExpired(token, session?.user)
      setNewToken(updatedToken || "")
    }

    checkToken()
  }, [token, session])


  const { data, error, isLoading } = useQuery({
    queryFn: () => getFunction(newToken, email),
    queryKey: ["expenses"],
    enabled: session != null && newToken != null && newToken !== "",
  })

  return { data, error, isLoading }
}