import { PlusCircle, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type OverviewCardProps = {
  cardName: string;
  cardIncomeValue: string;
  cardExpenseValue: string;
};

export default function OverviewCard({
  cardName,
  cardIncomeValue,
  cardExpenseValue,
}: OverviewCardProps) {
  return (
    <Card className="w-72 m-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{cardName}</CardTitle>
      </CardHeader>
      <Link href="/receitas">
        <CardContent className="flex items-center">
          <span className="pr-2">
            <PlusCircle className="h-6 w-6 text-green-700" />
          </span>
          <div className="flex justify-between w-full">
            <div>Receitas</div>
            <div>
              <span className="dark:text-white/70 pr-1">R$</span>
              {cardIncomeValue}
            </div>
          </div>
        </CardContent>
      </Link>
      <Link href="/despesas">
        <CardContent className="flex items-center">
          <span className="pr-2">
            <MinusCircle className="h-6 w-6 text-red-700" />
          </span>
          <div className="flex justify-between w-full">
            <div>Despesas</div>
            <div>
              <span className="dark:text-white/70 pr-1">R$</span>
              {cardExpenseValue}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
