"use client";

import { useState, useEffect } from "react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { BillType } from '@/types/billsType'

  type CreateExpenseProps = {
    amount: number;
    description: string;
    fixed: boolean;
    userId: string;
    createdAt: string;
    totalInstallments: number;
    billType: string;
  };

async function CreateExpense(
  newToken: string,
  { amount, description, fixed, userId, createdAt, totalInstallments, billType }: CreateExpenseProps
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };

  const data: Record<string, any> = {
    amount,
    isPaid: false,
    billType,
    description,
    fixed,
    userId,
    createdAt,
    totalInstallments,
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
      return response.data.result;
    } else {
      throw new Error("Missing server response");
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
      const addedExpense: BillType = {
        id: data.id,
        groupId: data.groupId,
        billType: data.billType,
        isPaid: false,
        amount: variables.amount,
        description: variables.description,
        fixed: variables.fixed,
        userId: variables.userId,
        createdAt: variables.createdAt,
        expiresAt: data.expiresAt,
        totalInstallments: variables.totalInstallments,
        updatedAt: data.updatedAt,
        installment: data.installment,
      }

      const selectedMonth = new Date(variables.createdAt?.toString()).getMonth() + 1;
      const year = new Date(variables.createdAt?.toString()).getFullYear();

      if (variables.fixed) {
        for (let month = 1; month <= 12; month++) {
          updateExpenseDataForMonth(queryClient, month, addedExpense);
        }
      } else {
        for (let month = selectedMonth; month < selectedMonth + variables.totalInstallments; month++) {
          let updateMonth = month;
          let updateYear = year;
    
          if (updateMonth > 12) {
            updateYear += Math.floor((updateMonth - 1) / 12);
            updateMonth = updateMonth % 12 || 12;
          }
    
          updateExpenseDataForMonth(queryClient, updateMonth, addedExpense, updateYear);
        }
      }

      function updateExpenseDataForMonth(queryClient: QueryClient, month: number, addedExpense: CreateExpenseProps, updateYear?: number) {
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
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    addExpense,
  };
};
