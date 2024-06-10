"use client";

import { useState, useEffect } from "react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { db } from "@/utils/db";

  type CreateExpenseProps = {
    createdAt: string;
    installments: number;
    amount: number;
    description: string;
    fixed: boolean;
    userId: string;
  };

async function CreateExpense(
  newToken: string,
  { amount, description, fixed, userId, createdAt, installments }: CreateExpenseProps
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
    installments,
  };  

  amount.toFixed(2);
  
  try {
  const response = await axios
    .post(
      "https://paguei-back-end.vercel.app/expenses/create-expense",
      data,
      {
        headers: headers,
      }
    )

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

export const useCreateExpense = () => {
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

  const { mutateAsync: addExpense } = useMutation({
    mutationFn: (variables: CreateExpenseProps) => CreateExpense(newToken!, variables),
    onSuccess: (data, variables) => {

      const addedExpense = {
        ...variables,
        id: data,
      }

      const selectedMonth = new Date(variables.createdAt?.toString()).getMonth() + 1;
      const year = new Date(variables.createdAt?.toString()).getFullYear();

      if (variables.fixed) {
        for (let month = 1; month <= 12; month++) {
          updateIncomeDataForMonth(queryClient, month, addedExpense);
        }
      } else {
        updateIncomeDataForMonth(queryClient, selectedMonth, addedExpense);
      }

      function updateIncomeDataForMonth(queryClient: QueryClient, month: number, addedExpense: CreateExpenseProps) {
        queryClient.setQueryData(['expenses-by-month', month, year], (old: any) => {
          if (!old || old.length === 0) {
            return [addedExpense];
          }
          return [...old, addedExpense]
        })
      
        queryClient.setQueryData(['expenses'], (old: any) => {        
          if (!old || old.length === 0) {
            return [addedExpense];
          }
          return [...old, addedExpense];
        })
      }

      db.expenses.put(addedExpense);
      
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    addExpense,
  };
};
