"use client";

import { useState, useEffect } from "react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";

type CreateIncomeProps = {
  createdAt: string;
  installments: number;
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
};


async function CreateIncome(
  newToken: string,
  { amount, description, fixed, userId, createdAt, installments }: CreateIncomeProps
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
    createdAt,
    installments
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
   
      const addedIncome = {
        ...variables,
        id: data,
      }

      const selectedMonth = new Date(variables.createdAt?.toString()).getMonth() + 1;
      const year = new Date(variables.createdAt?.toString()).getFullYear();

      if (variables.fixed) {
        for (let month = 1; month <= 12; month++) {
          updateIncomeDataForMonth(queryClient, month, addedIncome);
        }
      } else {
        updateIncomeDataForMonth(queryClient, selectedMonth, addedIncome);
      }

      function updateIncomeDataForMonth(queryClient: QueryClient, month: number, addedIncome: CreateIncomeProps) {
        queryClient.setQueryData(['incomes-by-month', month, year], (old: any) => {
          if (!old || old.length === 0) {
            return [addedIncome];
          }
          return [...old, addedIncome]
        })
      
        queryClient.setQueryData(['incomes'], (old: any) => {        
          if (!old || old.length === 0) {
            return [addedIncome];
          }
          return [...old, addedIncome];
        })
      }
      
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    addIncome,
  };
};
