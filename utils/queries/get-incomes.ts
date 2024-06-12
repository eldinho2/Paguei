'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"

async function getIncomesFunction(token: any, email: any) {
    try {
    const response = await axios.get(`https://paguei-back-end.vercel.app/incomes/get-all-incomes/${email}`, {  
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    

    const incomes = response.data.result

    if (!incomes || incomes.length === 0) {
      return []
    }

    return incomes
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetIncomes() {
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
        return getIncomesFunction(newToken, email)
      }
    },
    queryKey: ["incomes"],
    enabled: session != null && newToken != null && newToken !== "",
  })

  return { data, error, isLoading }
}