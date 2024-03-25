'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import MonthResume from "./MonthResume";
import { Suspense } from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";

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