"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { JwtIsExpired } from "@/utils/jwt-is-expired";

type DeleteExpenseProps = {
  id : string;
};


async function DeleteExpense( newToken: string, { id }: DeleteExpenseProps) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`,
  };

  const data = {
    id
  }
  

  axios
    .post(
      "http://localhost:3005/expenses/delete-expense",
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
  //const queryClient = useQueryClient();


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

  const { mutateAsync: deleteExpense } = useMutation({
    mutationFn: (variables: DeleteExpenseProps) => DeleteExpense(newToken || "", variables),
    onSuccess: (_, variables) => {
          
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return {
    deleteExpense,
  };
};
