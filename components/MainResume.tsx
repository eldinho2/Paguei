import ValueLabels from "./ui/ValueLabels";
import {useGetExpensesByMonth} from '@/utils/queries/get-expenses-by-month'
import {useGetIncomesByMonth} from '@/utils/queries/get-incomes-by-month'

export default function MainResume() {
  const { data: expenses, isLoading: isLoadingExpenses } = useGetExpensesByMonth();
  const { data: incomes, isLoading: isLoadingIncomes } = useGetIncomesByMonth();

  const totalIncomes = incomes?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00";
  const totalExpenses = expenses?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00";

  let incomesTotal = incomes?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0);
  let expensesTotal = expenses?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0);

  incomesTotal = incomesTotal !== undefined ? incomesTotal : 0;
  expensesTotal = expensesTotal !== undefined ? expensesTotal : 0;

  let saldo = (incomesTotal - expensesTotal).toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  
  return (
    <section className="pt-16">
      <section className="flex justify-center pt-2 h-24 w-full bg-[#252628]">
        <div className="flex gap-4">
          <ValueLabels label="Receita" value={totalIncomes} className="transform scale-90 translate-y-0 text-white/70" />
          <ValueLabels label="Saldo" value={saldo} className="transform scale-100 translate-y-2 z-10 text-white" />
          <ValueLabels label="Despesas" value={totalExpenses} className="transform scale-90 translate-y-0 text-white/70" />
        </div>
      </section>
    </section>
  );
}
