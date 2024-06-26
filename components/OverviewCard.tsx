import { PlusCircle, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelectedMonth } from "@/stores/selectedMonth-store";

import { billsDb } from '@/types/billsDb';

export default function OverviewCard({ expensesDb, incomesDb }: billsDb) {
  const month = useSelectedMonth((state) => state.month);

  const cardTotalExpense = expensesDb?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0);
  const cardTotalIncome = incomesDb?.reduce((acc: any, curr: { amount: any }) => acc + curr.amount, 0);

  return (
    <div>
        <Card className="w-72 m-4 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Visão geral</CardTitle>
          </CardHeader>
          <Link href="/receitas">
            <CardContent className="flex items-center">
              <span className="pr-2">
                <PlusCircle className="h-6 w-6 text-green-700" />
              </span>
              <div className="flex justify-between w-full gap-1">
                <div>Receitas</div>
                <div className="flex items-center truncate">
                  <span className="dark:text-white/70 pr-1">R$</span>
                  {
                    !incomesDb ? (
                      <Skeleton className="h-4 w-[70px]" />
                    ) : (
                      cardTotalIncome?.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })
                    )
                  }
                </div>
              </div>
            </CardContent>
          </Link>
          <Link href="/despesas">
            <CardContent className="flex items-center">
              <span className="pr-2">
                <MinusCircle className="h-6 w-6 text-red-700" />
              </span>
              <div className="flex justify-between w-full gap-1">
                <div>Despesas</div>
                <div className="flex items-center truncate">
                  <span className="dark:text-white/70 pr-1">R$</span>
                  {
                    !expensesDb ? (
                      <Skeleton className="h-4 w-[70px]" />
                    ) : (
                      cardTotalExpense?.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })
                    )
                  }
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
    </div>
  );
}
