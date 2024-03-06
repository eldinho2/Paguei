'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import { useGetExpenses } from '@/utils/queries/get-expenses';
import { useGetIncomes } from "@/utils/queries/get-incomes";
import MonthResume from "./MonthResume";
import { useGetExpensesByMonth } from "@/utils/queries/get-expenses-by-month";

export default function Main() {
  const { data: expensesData } = useGetExpenses();
  const { data: incomesData } = useGetIncomes();
  const { data: expensesByMonth, isLoading: isLoadingExpensesByMonth } = useGetExpensesByMonth();

  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <MonthResume expenses={expensesByMonth} incomes={incomesData} isLoading={isLoadingExpensesByMonth} />
      <OverviewCard expenses={expensesData}  incomes={incomesData}  isLoading={isLoadingExpensesByMonth}/>
      <LastExpenses expenses={expensesData} />
      <LastIncome incomes={incomesData} />
      </div>
    </main>
  )
}