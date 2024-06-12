'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import MonthResume from "./ChartMonthResume";

import { Suspense } from 'react';
import { useGetExpensesByMonth } from '@/utils/queries/get-expenses-by-month';
import { useGetIncomesByMonth } from '@/utils/queries/get-incomes-by-month';

export default function Main() {
  const { data: expensesDb } = useGetExpensesByMonth();    
  const { data: incomesDb } = useGetIncomesByMonth();

  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <main className="w-full">
        <MainResume expensesDb={expensesDb} incomesDb={incomesDb} />
        <div className="flex flex-col justify-center items-center">
            <MonthResume expensesDb={expensesDb}/>
            <OverviewCard expensesDb={expensesDb} incomesDb={incomesDb} />
            <LastExpenses expensesDb={expensesDb} />
            <LastIncome incomesDb={incomesDb} />
        </div>
      </main>
    </Suspense>
  )
}