import ValueLabels from "./ui/ValueLabels";
import Link from "next/link";
import { billsDb } from "@/types/billsDb";


export default function MainResume({
  expensesDb,
  incomesDb,
}: billsDb) {

  const totalIncomes =
  incomesDb
      ?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0)
      .toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00";
  const totalExpenses =
  expensesDb
      ?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0)
      .toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00";

  let incomesTotal = incomesDb?.reduce(
    (acc: any, curr: { amount: any }) => acc + curr.amount,
    0
  );
  let expensesTotal = expensesDb?.reduce(
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
