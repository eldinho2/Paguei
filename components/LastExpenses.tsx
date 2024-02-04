import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusCircle } from "lucide-react";

type OverviewCardProps = {
  expenses: {
    id: number;
    name: string;
    value: string;
    date: string;
    fixed: boolean;
    fixedDate: string;
  }[];
};

export default function LastExpenses({
  expenses
}: OverviewCardProps) {
  return (
    <Card className="w-[284px] m-4 shadow-lg">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl font-semibold">Últimas despesas</CardTitle>
        <MinusCircle className="h-6 w-6 text-red-700" />
      </CardHeader>
      <div className="h-72 overflow-y-scroll">
      {
        expenses.map((expense) => (
          <CardContent key={expense.id} className="flex items-center">
            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between w-full">
                <p>{expense.name}</p>
                <div>
                  <span className="dark:text-white/70 pr-1">R$</span>
                  {expense.value}
                </div>
              </div>
              <div className="text-sm flex justify-between w-full pt-3">
                <span className="dark:text-white/70 pr-1">Fixa mensal</span>
                <span className="dark:text-white/70 pr-1">12:45</span>
              </div>
              <div className="pt-4 border-b flex-1 border-white/20"></div>
            </div>
          </CardContent>
        ))
      }
      </div>
    </Card>
  );
}
