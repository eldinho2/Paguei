import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import { auth } from '@/lib/auth'

export default async function Main() {
  const session = await auth()

  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <h1 className='text-white'>{JSON.stringify(session?.user)}</h1>
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      </div>
    </main>
  )
}