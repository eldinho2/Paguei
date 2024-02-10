import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusCircle } from "lucide-react";

type OverviewCardProps = {
  expenses: {
    id: string;
    amount: number;
    description: string;
    fixed: boolean;
    createdAt: string;
    userId: string;
  }[];
};

export default function LastExpenses({ expenses }: OverviewCardProps) {

  const lastExpenses = expenses.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 7
  )


  return (
    <Card className="w-[284px] m-4 shadow-lg">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl font-semibold">
          Últimas despesas
        </CardTitle>
        <MinusCircle className="h-6 w-6 text-red-700" />
      </CardHeader>
      <div className="min-h-28 max-h-72 overflow-y-scroll">
        {!lastExpenses ? (
          <CardContent>
            <p className="text-center">Nenhuma despesa encontrada</p>
          </CardContent>
        ) : (
          lastExpenses.map((expense) => (
            <CardContent key={expense.id} className="flex items-center">
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between w-full">
                  <p className="overflow-hidden text-ellipsis">
                    {expense.description}
                  </p>
                  <div className="overflow-hidden text-ellipsis">
                    <span className="dark:text-white/70 pr-1">R$</span>
                    {Number(expense.amount).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="text-sm flex justify-between w-full pt-3">
                  <span className="dark:text-white/70 pr-1">
                    {expense.fixed ? "Fixa" : "Variável"}
                  </span>
                  <span className="dark:text-white/70 pr-1">
                    {new Date(expense.createdAt).toLocaleDateString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                </div>
                <div className="pt-4 border-b flex-1 border-white/20"></div>
              </div>
            </CardContent>
          ))
        )}
      </div>
    </Card>
  );
}
