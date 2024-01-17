import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";

export default function Main() {
  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
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