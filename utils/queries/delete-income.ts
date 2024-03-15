"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { useSelectedMonth } from '@/stores/selectedMonth-store';

type DeleteIncomeProps = {
  id : string;
};


async function DeleteIncome( newToken: string, { id }: DeleteIncomeProps) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };

  const data = {
    id
  }
  

  axios
    .post(
      "https://paguei-back-end.onrender.com/incomes/delete-income",
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

export const useDeleteIncome = () => {
  //const queryClient = useQueryClient();
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

  const queryClient = useQueryClient();

  const { mutateAsync: deleteIncome } = useMutation({
    mutationFn: (variables: DeleteIncomeProps) => DeleteIncome(newToken || "", variables),
    onSuccess: (_, variables) => {
      const cache2 = queryClient.getQueryData(['incomes-by-month', month])
      
      queryClient.setQueryData(['incomes-by-month', month], (old: any) => {
        if (!old || old.length === 0) {
          return [];
        }
        return old.filter((expense: any) => expense.id !== variables.id)
      })

      return { cache2 }

    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    deleteIncome,
  };
};
