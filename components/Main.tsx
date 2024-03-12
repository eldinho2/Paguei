'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import { useGetExpenses } from '@/utils/queries/get-expenses';
import { useGetIncomes } from "@/utils/queries/get-incomes";
import MonthResume from "./MonthResume";
import { useGetExpensesByMonth } from "@/utils/queries/get-expenses-by-month";
import { useGetIncomesByMonth } from "@/utils/queries/get-incomes-by-month";

export default function Main() {
  const { data: expensesData } = useGetExpenses();
  const { data: incomesData } = useGetIncomes();
  const { data: expensesByMonth, isLoading: isLoadingExpensesByMonth } = useGetExpensesByMonth();
  const { data: incomesByMonth } = useGetIncomesByMonth();

  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <MonthResume expenses={expensesByMonth} isLoading={isLoadingExpensesByMonth} />
      <OverviewCard expenses={expensesByMonth}  incomes={incomesByMonth}  isLoading={isLoadingExpensesByMonth}/>
      <LastExpenses expenses={expensesData} />
      <LastIncome incomes={incomesData} />
      </div>
    </main>
  )
}