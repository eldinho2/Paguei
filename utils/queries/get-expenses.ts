'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"
import { db } from "@/utils/db";

async function getExpensesFunction(token: any, email: any) {
    try {
    const response = await axios.get(`https://paguei-back-end.vercel.app/expenses/get-all-expenses/${email}`, {  
      headers: {
          Authorization: `Bearer ${token}`,
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
      setNewToken(updatedToken)
    }

    checkToken()
  }, [token, session])

  const { data, error, isLoading } = useQuery({
    queryFn: () => {
      if (token && email) {
        return getExpensesFunction(newToken, email)
      }
    },
    queryKey: ["expenses"],
    enabled: session != null && newToken != null && newToken !== "",
  })

  useEffect(() => {
    if (data) {
      db.expenses.bulkPut(data)
    }
  }, [data])

  return { data, error, isLoading }
}