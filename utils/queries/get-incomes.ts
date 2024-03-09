'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { JwtIsExpired } from "@/utils/jwt-is-expired"

async function getIncomesFunction(token: any, email: any) {
    await email

    try {
    const response = await axios.get(`https://paguei-back-end.onrender.com/incomes/get-all-incomes/${email}`, {  
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
  //const token = session?.user.accessToken
  const email = session?.user.email

  const token = session?.user.accessToken

  console.log('log 1 -----------------------------------------', session);  

  const { data, error, isLoading } = useQuery({
    queryFn: () => {
      if (token && email) {
        return getIncomesFunction(token, email)
      }
    },
    queryKey: ["incomes"],
  })

  return { data, error, isLoading }
}