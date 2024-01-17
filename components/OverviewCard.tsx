import { PlusCircle, MinusCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="w-80 m-4 shadow-lg">
      <CardHeader>
        <CardTitle>{cardName}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center">
        <span className="pr-2">
          <PlusCircle className="h-6 w-6 text-green-700" />
        </span>
        <div className="flex justify-between w-full">
          <div>Receitas</div>
          <div>
            <span className="text-black pr-1">R$</span>
            {cardIncomeValue}
          </div>
        </div>
      </CardContent>
      <CardContent className="flex items-center">
        <span className="pr-2">
          <MinusCircle className="h-6 w-6 text-red-700" />
        </span>
        <div className="flex justify-between w-full">
          <div>Despesas</div>
          <div>
            <span className="text-black pr-1">R$</span>
            {cardExpenseValue}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
