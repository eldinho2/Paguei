import { PlusCircle, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {useSelectedMonth} from "@/stores/selectedMonth-store";
import {FilterByMonth} from '@/utils/filterByMonth';

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

  const cardIncomeValueByMonth = FilterByMonth({data: incomes, month: month});
  const cardExpenseValueByMonth = FilterByMonth({data: expenses, month: month});
  
  
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
