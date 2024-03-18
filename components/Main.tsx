import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import MonthResume from "./MonthResume";
import { Suspense } from 'react';


export default function Main() {
  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
        <Suspense fallback={<p>Carregando...</p>}>
          <MonthResume/>
          <OverviewCard/>
          <LastExpenses />
          <LastIncome />
        </Suspense>
      </div>
    </main>
  )
}