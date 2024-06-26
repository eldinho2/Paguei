'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"
import { useSelectedMonth } from '@/stores/selectedMonth-store';
import { useSelectedYear } from '@/stores/selectedYear-store';

async function GetIncomesByMonth(newToken: any, email: any, month: any, year: any) {
  try{
  const response = await axios.get(`https://paguei-back-end.vercel.app/incomes/get-income-by-month/${month}/${year}/${email}`, {
    headers: {
        Authorization: `Bearer ${newToken}`,
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

export function useGetIncomesByMonth() {
  const month = useSelectedMonth((state) => state.month)
  const year = useSelectedYear((state) => state.year)

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
    queryFn: () => GetIncomesByMonth(newToken, email, month, year),
    queryKey: ["incomes-by-month", month, year],
    enabled: session != null && newToken != null && newToken !== "",
  })

  return { data, error, isLoading }
}