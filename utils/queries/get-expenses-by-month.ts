'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"
import { useSelectedMonth } from '@/stores/selectedMonth-store';

export async function GetExpensesByMonth(token: any, email: any, month: any) {
  try{
  const response = await axios.get(`https://paguei-back-end.onrender.com/expenses/get-expense-by-month/${month}/${email}`, {
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

export function useGetExpensesByMonth() {
  const month = useSelectedMonth((state) => state.month)
  
  const { data: session } = useSession()
  //const token = session?.user.accessToken
  const email = session?.user.email

  //console.log(email);

  const token = session?.user.accessToken

  const { data, error, isLoading } = useQuery({
    queryFn: () => {
      if (token && email) {
        return GetExpensesByMonth(token, email, month)
      }
    },
    queryKey: ["expenses-by-month", month],
  })

  return { data, error, isLoading }
}