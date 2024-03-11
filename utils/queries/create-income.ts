"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { QueryCache } from '@tanstack/react-query'
import { useSelectedMonth } from '@/stores/selectedMonth-store';

type CreateIncomeProps = {
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  date?: string;
};


async function CreateIncome(
  newToken: string,
  { amount, description, fixed, userId, date }: CreateIncomeProps
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };

  const data: Record<string, any> = {
    amount,
    description,
    fixed,
    userId,
  };

  try {
    const response = await axios.post(
      "https://paguei-back-end.onrender.com/incomes/create-income",
      data,
      {
        headers: headers,
      }
    );

    if (response.data) {
      return response.data.result.id;
    } else {
      throw new Error("Missing 'id' in the server response");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const useCreateIncome = () => {
  const queryClient = useQueryClient();
  const month = useSelectedMonth((state) => state.month)



  const { data: session } = useSession();
  const token = session?.user.accessToken;

  
  
  const [newToken, setNewToken] = useState<string | undefined>(token);

  

  useEffect(() => {
    const checkToken = async () => {

      const updatedToken = await JwtIsExpired(token, session?.user);
      
      setNewToken(updatedToken || "");
    };

    checkToken();
  }, [token, session]);

  const { mutateAsync: addIncome } = useMutation({
    mutationFn: (variables: CreateIncomeProps) => CreateIncome(newToken!, variables),
    onSuccess: (data, variables, content) => {

      console.log("data", data);
      console.log("variables", variables);
      console.log("content", content);
      
      const cachedData = queryClient.getQueryData(['incomes-by-month', month]);
      console.log("cachedData", cachedData);

      const addedIncome = {
        ...variables,
        id: data,
      }

      queryClient.setQueryData(['incomes-by-month', month], (old: any) => {
        return [...old, addedIncome]
      })
      
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    addIncome,
  };
};
