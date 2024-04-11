"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { useSelectedMonth } from '@/stores/selectedMonth-store';
import { db } from "@/utils/db";
import { useSelectedYear } from "@/stores/selectedYear-store";

type UpdateExpenseProps = {
  id : string;
  amount: number;
  description: string;
  fixed: boolean;
};


async function UpdateExpense( newToken: string, { id, amount, description, fixed }: UpdateExpenseProps) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };

  const data = {
    id,
    amount,
    description,
    fixed,
  }
  

  axios
    .put(
      "https://paguei-back-end.onrender.com/expenses/update-expense",
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

export const useUpdateExpense = () => {
  const month = useSelectedMonth((state) => state.month)
  const year = useSelectedYear((state) => state.year)


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

  const queryClient = useQueryClient();

  const { mutateAsync: updateExpense } = useMutation({
    mutationFn: (variables: UpdateExpenseProps) => UpdateExpense(newToken || "", variables),
    onSuccess: (_, variables) => {      
      const cache = queryClient.getQueryData(["expenses", month, year]);
      console.log(cache);
      
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    updateExpense,
  };
};
