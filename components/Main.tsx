'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import { auth } from '@/lib/auth'
import { useGetExpenses } from '@/utils/queries/get-expenses';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { Login } from "../utils/api";
import { useGetIncomes } from "@/utils/queries/get-incomes";

export default function Main() {
  const { data: expensesData, isLoading:  isLoadingExpenses} = useGetExpenses();
  const { data: incomesData, isLoading: isLoadingIncomes } = useGetIncomes();

  console.log('expensesData', expensesData);
  console.log('incomesData', incomesData);
  
  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <LastExpenses expenses={expensesData} />
      <LastIncome incomes={incomesData} />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      </div>
    </main>
  )
}