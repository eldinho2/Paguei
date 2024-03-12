"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { useSelectedMonth } from '@/stores/selectedMonth-store';

type CreateExpenseProps = {
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  createdAt?: string;
};


async function CreateExpense(
  newToken: string,
  { amount, description, fixed, userId, createdAt }: CreateExpenseProps
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
    createdAt
  };

  console.log("Data to send:", data);
  

  try {
  const response = await axios
    .post(
      "https://paguei-back-end.onrender.com/expenses/create-expense",
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

  const { mutateAsync: addExpense } = useMutation({
    mutationFn: (variables: CreateExpenseProps) => CreateExpense(newToken!, variables),
    onSuccess: (data, variables) => {

      
      console.log("Variables:", variables);

      const addedExpense = {
        ...variables,
        id: data,
      }

      queryClient.setQueryData(['expenses-by-month', month], (old: any) => {
        if (!old || old.length === 0) {
          return [addedExpense];
        }
        return [...old, addedExpense];
      })
      
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    addExpense,
  };
};
