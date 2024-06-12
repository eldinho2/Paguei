import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useGetIncomes } from "@/utils/queries/get-incomes";
import { billsDb } from '@/types/billsDb';

type IncomeType = {
  id: number;
  description: string;
  amount: number;
  fixed: boolean;
  createdAt: string;
}

export default function LastIncomes({incomesDb}: billsDb) {
  if (!incomesDb || incomesDb.length === 0) {
    return (
      <Card className="w-[284px] m-4 shadow-lg">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-2xl font-semibold">
            Últimas receitas
          </CardTitle>
          <PlusCircle className="h-6 w-6 text-green-700" />
        </CardHeader>
        <CardContent>
        <p className="text-center">{
            incomesDb && incomesDb.length === 0 ? "Nenhuma receita encontrada" : "Carregando..."
          }</p>
        </CardContent>
      </Card>
    );
  }

  const lastIncomes = incomesDb.toReversed().slice(0, 7)

  return (
    <Card className="w-[284px] m-4 shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">
          Últimas receitas
        </CardTitle>
        <PlusCircle className="h-6 w-6 text-green-700" />
      </CardHeader>
      <div className="min-h-28 max-h-44 overflow-y-scroll">
        {!lastIncomes ? (
          <CardContent>
            <p className="text-center">Nenhuma receita encontrada</p>
          </CardContent>
        ) : (
          lastIncomes.map((income: IncomeType) => (
            <CardContent key={income.id} className="flex items-center">
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between w-full">
                    <p className="truncate flex-1">{income.description || 'Sem Nome'}</p>
                  <div className="flex truncate">
                    <span className="dark:text-white/70 pr-1">R$</span>
                      {income.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                  </div>
                </div>
                <div className="text-sm flex justify-between w-full pt-3">
                  <span className="dark:text-white/70 pr-1">
                    {income.fixed ? "Fixa" : "Variável"}
                  </span>
                  <span className="dark:text-white/70 pr-1">
                    {new Date(income.createdAt).toLocaleDateString("pt-BR", {
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
