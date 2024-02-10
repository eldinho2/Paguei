'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"

export async function getFunction(newToken: string) {
  try {
    const response = await axios.get("https://paguei-back-end.onrender.com/expenses/get-all-expenses", {
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
  const [newToken, setNewToken] = useState<string | undefined>(token)

  useEffect(() => {
    const checkToken = async () => {
      const updatedToken = await JwtIsExpired(token, session?.user)
      setNewToken(updatedToken)
    }

    checkToken()
  }, [token, session])

  const { data, error, isLoading } = useQuery({
    queryFn: () => getFunction(newToken),
    queryKey: ["expenses"],
    enabled: session != null && newToken != null,
  })

  return { data, error, isLoading }
}