"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { useSelectedMonth } from '@/stores/selectedMonth-store';
import { useSelectedYear } from "@/stores/selectedYear-store";

type DeleteIncomeProps = {
    id : string;
    groupId: string;
    totalInstallments: number;
  };


async function DeleteIncome( newToken: string, { id, groupId, totalInstallments }: DeleteIncomeProps) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };
    
  const data = {
    id,
    groupId,
    totalInstallments
  }
  

  axios
    .post(
      "https://paguei-back-end.vercel.app/incomes/delete-income",
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

  const { mutateAsync: deleteIncome } = useMutation({
    mutationFn: (variables: DeleteIncomeProps) => DeleteIncome(newToken || "", variables),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['incomes-by-month', month, year], (old: any) => {
        if (!old || old.length === 0) {
          return [];
        }
        return old.filter((expense: any) => expense.id !== variables.id)
      })

      queryClient.setQueryData(['incomes'], (old: any) => {
        if (!old || old.length === 0) {
          return [];
        }
        return old.filter((expense: any) => expense.id !== variables.id)
      })
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    deleteIncome,
  };
};
