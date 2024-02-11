import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddIncomeButton from "@/components/AddIncomeButton";

type OverviewCardProps = {
  incomes: {
    id: string;
    amount: number;
    description: string;
    fixed: boolean;
    createdAt: string;
    userId: string;
  }[];
};

export default function LastIncomes({ incomes }: OverviewCardProps) {
  if (!incomes || incomes.length === 0) {
    return (
      <Card className="w-[284px] m-4 shadow-lg">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-2xl font-semibold">
            Últimas receitas
          </CardTitle>
          <AddIncomeButton className="h-6 w-6 text-green-700" />
        </CardHeader>
        <CardContent>
          <p className="text-center">Aguarde, carregando receitas...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[284px] m-4 shadow-lg">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl font-semibold">
          Últimas receitas
        </CardTitle>
        <AddIncomeButton className="h-6 w-6 text-green-700" />
      </CardHeader>
      <div className="min-h-28 max-h-72 overflow-y-scroll">
        {incomes.map((incomes) => (
          <CardContent key={incomes.id} className="flex items-center">
            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between w-full">
                <p>{incomes.description}</p>
                <div>
                  <span className="dark:text-white/70 pr-1">R$</span>
                  {incomes.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                </div>
              </div>
              <div className="text-sm flex justify-between w-full pt-3">
                <span className="dark:text-white/70 pr-1">
                  {incomes.fixed ? "Fixa" : "Variável"}
                </span>
                <span className="dark:text-white/70 pr-1">
                  {new Date(incomes.createdAt).toLocaleDateString("pt-BR", {
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
        ))}
      </div>
    </Card>
  );
}
