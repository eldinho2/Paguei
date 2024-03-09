"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { QueryCache } from '@tanstack/react-query'

type CreateExpenseProps = {
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  date?: string;
};


async function CreateExpense(
  newToken: string,
  { amount, description, fixed, userId, date }: CreateExpenseProps
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

  axios
    .post(
      "https://paguei-back-end.onrender.com/expenses/create-expense",
      data,
      {
        headers: headers,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const useCreateExpense = () => {
  const queryClient = useQueryClient();


  const { data: session } = useSession();
  const token = session?.user.accessToken;

  //console.log("token", token);
  
  
  const [newToken, setNewToken] = useState<string | undefined>(token);

  //console.log("atual", token, 'novo', newToken);
  

  useEffect(() => {
    const checkToken = async () => {

      const updatedToken = await JwtIsExpired(token, session?.user);
      //console.log("atualizando token", updatedToken);
      
      setNewToken(updatedToken || "");
    };

    checkToken();
  }, [token, session]);

  const { mutateAsync: addExpense } = useMutation({
    mutationFn: (variables: CreateExpenseProps) => CreateExpense(newToken!, variables),
    onSuccess: (_, variables) => {

      
      const cachedData = queryClient.getQueryData(['expenses-by-month']);
      const data = queryClient.getQueryData(["expenses"]);

      console.log("cachedData", cachedData);
      console.log("data", data);


      
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    addExpense,
  };
};
