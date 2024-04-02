'use client'

const MainResume = lazy(() => import ("./MainResume"));
const OverviewCard = lazy(() => import ("./OverviewCard"));
const LastExpenses = lazy(() => import ("./LastExpenses"));
const LastIncome = lazy(() => import ("./LastIncomes"));
const MonthResume = lazy(() => import ("./MonthResume"));

import { Suspense } from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";
import { lazy } from 'react';

export default function Main() {
  const expenses = useLiveQuery(() => db.expenses.toArray())
  const incomes = useLiveQuery(() => db.incomes.toArray())

  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
        <Suspense fallback={<p>Carregando...</p>}>
          <MonthResume LocalExpenses={expenses || []}/>
          <OverviewCard LocalExpenses={expenses || []} LocalIncomes={incomes || []} />
          <LastExpenses LocalExpenses={expenses || []} />
          <LastIncome LocalIncomes={incomes || []} />
        </Suspense>
      </div>
    </main>
  )
}