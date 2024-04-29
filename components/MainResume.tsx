"use client";

import ValueLabels from "./ui/ValueLabels";
import { useGetExpensesByMonth } from "@/utils/queries/get-expenses-by-month";
import { useGetIncomesByMonth } from "@/utils/queries/get-incomes-by-month";
import { useSelectedMonth } from '@/stores/selectedMonth-store';
import { Bills } from "@/utils/db";
import Link from "next/link";

type MainResumeProps = {
  LocalExpenses: Bills[];
  LocalIncomes: Bills[];
};

export default function MainResume({
  LocalExpenses,
  LocalIncomes,
}: MainResumeProps) {
  const month = useSelectedMonth((state) => state.month);

  const { data: expensesDb } = useGetExpensesByMonth();
  const { data: incomesDb } = useGetIncomesByMonth();

  const LocalExpensesFilteredByMonth = LocalExpenses.filter((expense) => {
    const expenseMonth = new Date(expense.createdAt).getMonth() + 1;
    return expenseMonth === month;
  })

  const LocalIncomesFilteredByMonth = LocalIncomes.filter((income) => {
    const incomeMonth = new Date(income.createdAt).getMonth() + 1;
    return incomeMonth === month;
  })

  const expenses = expensesDb || LocalExpensesFilteredByMonth;
  const incomes = incomesDb || LocalIncomesFilteredByMonth;

  const totalIncomes =
    incomes
      ?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0)
      .toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00";
  const totalExpenses =
    expenses
      ?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0)
      .toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00";

  let incomesTotal = incomes?.reduce(
    (acc: any, curr: { amount: any }) => acc + curr.amount,
    0
  );
  let expensesTotal = expenses?.reduce(
    (acc: any, curr: { amount: any }) => acc + curr.amount,
    0
  );

  incomesTotal = incomesTotal !== undefined ? incomesTotal : 0;
  expensesTotal = expensesTotal !== undefined ? expensesTotal : 0;

  let saldo = (incomesTotal - expensesTotal).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

  return (
    <section className="pt-16">
      <section className="flex justify-center pt-2 h-24 w-full bg-pink-300 dark:bg-[#252628]">
        <div className="flex gap-4">
          <Link href="/receitas" className="dark:text-white text-black">
            <ValueLabels
              label="Receita"
              value={totalIncomes}
              className="transform scale-90 translate-y-0 dark:text-white/70 text-black/70"
            />
          </Link>
          <ValueLabels
            label="Saldo"
            value={saldo}
            className="transform scale-100 translate-y-2 z-10 dark:text-white text-black"
          />
          <Link href="/despesas" className="dark:text-white text-black">
            <ValueLabels
              label="Despesas"
              value={totalExpenses}
              className="transform scale-90 translate-y-0 dark:text-white/70 text-black/70"
            />
          </Link>
        </div>
      </section>
    </section>
  );
}
