'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"

async function getExpensesFunction(token: any, email: any) {
    try {
    const response = await axios.get(`https://paguei-back-end.onrender.com/expenses/get-all-expenses/${email}`, {  
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
  const email = session?.user.email
  //console.log(session?.user.user.email);
  const token = session?.user.accessToken
  //console.log(session?.user.email);
  //console.log(session?.user.accessToken);
  


  const { data, error, isLoading } = useQuery({
    queryFn: () => {
      if (token && email) {
        return getExpensesFunction(token, email)
      }
    },
    queryKey: ["expenses"],
  })

  return { data, error, isLoading }
}