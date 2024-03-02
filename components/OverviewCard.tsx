import { PlusCircle, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {useSelectedMonth} from "@/stores/selectedMonth-store";

type OverviewCardProps = {
  expenses: {
    id: string;
    amount: number;
    description: string;
    fixed: boolean;
    createdAt: string;
    userId: string;
  }[];
  incomes: {
    id: string;
    amount: number;
    description: string;
    fixed: boolean;
    createdAt: string;
    userId: string;
  }[];
};
interface ISelectedMonth {
  month: number;
  updateSelecteMonth: (month: number) => void;
}

export default function OverviewCard({ expenses, incomes }: OverviewCardProps) {
  

  const month = useSelectedMonth((state: ISelectedMonth) => state.month); 

  const cardIncomeValueByMonth = incomes?.reduce((acc, income) => {

    const startDate = new Date(new Date().getFullYear(), month - 1, 1);
    const endDate = new Date(
      new Date().getFullYear(),
      month,
      0,
      23,
      59,
      59,
      999,
    );

    const date = new Date(income.createdAt);
    if (date >= startDate && date <= endDate) {
      return acc + income.amount;
    }

    return acc;
  } , 0);

  const cardExpenseValueByMonth = expenses?.reduce((acc, expense) => {
    const startDate = new Date(new Date().getFullYear(), month - 1, 1);
    const endDate = new Date(
      new Date().getFullYear(),
      month,
      0,
      23,
      59,
      59,
      999,
    );

    const date = new Date(expense.createdAt);
    if (date >= startDate && date <= endDate) {
      return acc + expense.amount;
    }
    return acc;
  } , 0);
  
  return (
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
            <div className="truncate">
              <span className="dark:text-white/70 pr-1">R$</span>
              {
                cardIncomeValueByMonth?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })
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
            <div className="truncate">
              <span className="dark:text-white/70 pr-1">R$</span>
              {
                cardExpenseValueByMonth?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })
              }
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
