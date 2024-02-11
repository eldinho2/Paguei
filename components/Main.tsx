'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import { useGetExpenses } from '@/utils/queries/get-expenses';
import { useGetIncomes } from "@/utils/queries/get-incomes";

export default function Main() {
  const { data: expensesData, isLoading:  isLoadingExpenses} = useGetExpenses();
  const { data: incomesData, isLoading: isLoadingIncomes } = useGetIncomes();
  
  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <LastExpenses expenses={expensesData} />
      <LastIncome incomes={incomesData} />
      <OverviewCard expenses={expensesData}  incomes={incomesData}/>
      </div>
    </main>
  )
}