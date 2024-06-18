"use client";

import { useState, useEffect } from "react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { BillType } from '@/types/billsType'

type CreateIncomeProps = {
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  createdAt: string;
  totalInstallments: number;
};


async function CreateIncome(
  newToken: string,
  { amount, description, fixed, userId, createdAt, totalInstallments }: CreateIncomeProps
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };  

  const data: Record<string, any> = {
    amount,
    isPaid: false,
    description,
    fixed,
    userId,
    createdAt,
    totalInstallments,
  };

  amount.toFixed(2);

  try {
    const response = await axios.post(
      "https://paguei-back-end.vercel.app/incomes/create-income",
      data,
      {
        headers: headers,
      }
    );

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
    onSuccess: (data, variables) => {
   
      const addedIncome: BillType = {
        id: data.id,
        groupId: data.groupId,
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
          updateIncomeDataForMonth(queryClient, month, addedIncome);
        }
      } else {
        for (let month = selectedMonth; month < selectedMonth + variables.totalInstallments; month++) {
          let updateMonth = month;
          let updateYear = year;
    
          if (updateMonth > 12) {
            updateYear += Math.floor((updateMonth - 1) / 12);
            updateMonth = updateMonth % 12 || 12;
          }
    
          updateIncomeDataForMonth(queryClient, updateMonth, addedIncome, updateYear);
        }
      }

      function updateIncomeDataForMonth(queryClient: QueryClient, month: number, addedIncome: CreateIncomeProps, updateYear?: number) {
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
