'use client'

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"

export async function getFunction(newToken: string | Promise<string> | undefined) {
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
  const newToken = JwtIsExpired(token)

  const { data, error, isLoading } = useQuery({
    queryFn: () => getFunction(newToken),
    queryKey: ["expenses"],
    enabled: session != null,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (newToken) {
        await getFunction(newToken)
      }
    }

    fetchData()
  }, [newToken])

  return { data, error, isLoading }
}
