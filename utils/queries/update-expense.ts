"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";
import { useSelectedMonth } from '@/stores/selectedMonth-store';
import { useSelectedYear } from "@/stores/selectedYear-store";

type UpdateExpenseProps = {
  id: string;
  isPaid: boolean;
};

async function UpdateExpense(newToken: string, { id, isPaid }: UpdateExpenseProps) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };

  const data = {
    isPaid,
  };

  try {
    const response = await axios.put(
      `https://paguei-back-end.vercel.app/expenses/update-expense/${id}`,
      data,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const useUpdateExpense = () => {
  const month = useSelectedMonth((state) => state.month);
  const year = useSelectedYear((state) => state.year);

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
      queryClient.setQueryData(['expenses-by-month', month, year], (old: any) => {
        if (!old || old.length === 0) {
          return [];
        }
        return old.map((expense: any) => {
          if (expense.id === variables.id) {
            return { ...expense, isPaid: variables.isPaid };
          }
          return expense;
        });
      });

      queryClient.setQueryData(['expenses'], (old: any) => {
        if (!old || old.length === 0) {
          return [];
        }
        return old.map((expense: any) => {
          if (expense.id === variables.id) {
            return { ...expense, isPaid: variables.isPaid };
          }
          return expense;
        });
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    updateExpense,
  };
};
