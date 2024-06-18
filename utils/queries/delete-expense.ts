"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { useSelectedMonth } from '@/stores/selectedMonth-store';
import { useSelectedYear } from "@/stores/selectedYear-store";

type DeleteExpenseProps = {
  id : string;
  groupId: string;
  totalInstallments: number;
};


async function DeleteExpense( newToken: string, { id, groupId, totalInstallments }: DeleteExpenseProps) {
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
      "https://paguei-back-end.vercel.app/expenses/delete-expense",
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

export const useDeleteExpense = () => {
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

  const { mutateAsync: deleteExpense } = useMutation({
    mutationFn: (variables: DeleteExpenseProps) => DeleteExpense(newToken || "", variables),
    onSuccess: (_, variables) => {
      const startMonth = month;
      const startYear = year;
      
      for (let i = 0; i < variables.totalInstallments; i++) {
        let updateMonth = startMonth + i;
        let updateYear = startYear;
        
        if (updateMonth > 12) {
          updateYear += Math.floor((updateMonth - 1) / 12);
          updateMonth = updateMonth % 12 || 12;
        }
        
        queryClient.setQueryData(['expenses-by-month', updateMonth, updateYear], (old: any) => {
          if (!old || old.length === 0) {
            return [];
          }
          return old.filter((expense: any) => expense.id !== variables.id);
        });
      }
    
      queryClient.setQueryData(['expenses'], (old: any) => {
        if (!old || old.length === 0) {
          return [];
        }
        return old.filter((expense: any) => expense.id !== variables.id);
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    deleteExpense,
  };
};
