'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import { useGetExpenses } from '@/utils/queries/get-expenses';
import { useGetIncomes } from "@/utils/queries/get-incomes";
import MonthResume from "./MonthResume";
import { auth } from '@/lib/auth';
import { useSession } from "next-auth/react"
import { useGetExpensesByMonth } from "@/utils/queries/get-expenses-by-month";
import { JwtIsExpired } from "@/utils/jwt-is-expired"
import { useSelectedMonth } from '@/stores/selectedMonth-store';
import { use, useEffect } from "react";

export default function Main() {
  const month = useSelectedMonth((state) => state.month)

  const { data: expensesData, isLoading:  isLoadingExpenses} = useGetExpenses();
  const { data: incomesData, isLoading: isLoadingIncomes } = useGetIncomes();
  
  const { data: expensesByMonth, isLoading: isLoadingExpensesByMonth } = useGetExpensesByMonth();

  console.log(expensesByMonth);

  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <MonthResume expenses={expensesByMonth} incomes={incomesData} />
      <OverviewCard expenses={expensesData}  incomes={incomesData}/>
      <LastExpenses expenses={expensesData} />
      <LastIncome incomes={incomesData} />
      </div>
    </main>
  )
}