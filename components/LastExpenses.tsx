import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusCircle } from "lucide-react";
import { useGetExpenses } from '@/utils/queries/get-expenses';
import { Bills } from '@/utils/db';

type ExpenseType = {
  id: number;
  description: string;
  amount: number;
  fixed: boolean;
  createdAt: string;
}

export default function LastExpenses({ LocalExpenses }: { LocalExpenses: Bills[] }) {
  let { data: expensesDb } = useGetExpenses();

  const expenses = expensesDb || LocalExpenses;
  
  if (!expenses || expenses.length === 0) {
    return (
      <Card className="w-[284px] m-4 shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-semibold">
            Últimas despesas
          </CardTitle>
          <MinusCircle className="h-6 w-6 text-red-700" />
        </CardHeader>
        <CardContent>
          <p className="text-center">{
            expenses && expenses.length === 0 ? "Nenhuma despesa encontrada" : "Carregando..."
          }</p>
        </CardContent>
      </Card>
    );
  }

  const lastExpenses = expenses.toReversed().slice(0, 7)

  return (
    <Card className="w-[284px] m-4 shadow-lg">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl font-semibold">
          Últimas despesas
        </CardTitle>
        <MinusCircle className="h-6 w-6 text-red-700" />
      </CardHeader>
      <div className="min-h-28 max-h-44 overflow-y-scroll">
        {!lastExpenses ? (
          <CardContent>
            <p className="text-center">Nenhuma despesa encontrada</p>
          </CardContent>
        ) : (
            lastExpenses.map((expense: ExpenseType) => (
            <CardContent key={expense.id} className="flex items-center">
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between w-full">
                    <p className="truncate flex-1">{expense.description || 'Sem Nome'}</p>
                  <div className="flex truncate">
                    <span className="dark:text-white/70 pr-1">R$</span>
                      {expense.amount.toLocaleString("pt-BR", {
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
