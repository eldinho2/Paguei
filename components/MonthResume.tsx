import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";
import { useTheme } from "next-themes";
import { useSelectedMonth } from "@/stores/selectedMonth-store";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const DynamicChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface ISelectedMonth {
  month: number;
  updateSelecteMonth: (month: number) => void;
}

function MonthResume({ expenses, isLoading }: any) {
  const { theme } = useTheme();

  const month = useSelectedMonth((state: ISelectedMonth) => state.month);

  const expensesSorted = expenses?.sort(
    (a: any, b: any) => a.amount - b.amount
  );
  const expensesNames = expensesSorted?.map(
    (expense: any) => expense.description
  );
  const expensesValues = expensesSorted?.map((expense: any) => expense.amount);

  const selectedMonth = months[month - 1];

  if (isLoading) {
    return (
      <Card className="w-72 h-full m-4 shadow-lg p-0">
        <CardHeader className="flex p-4">
          <CardTitle className="text-xl font-semibold">
            Despesas de {selectedMonth}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="flex gap-8">
            <Skeleton className="h-[125px] w-[120px] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[90px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (expenses && expenses.length === 0) {
    return (
      <Card className="w-72 h-full m-4 shadow-lg p-0">
        <CardHeader className="flex p-4">
          <CardTitle className="text-xl font-semibold">
            Despesas de {selectedMonth}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p>Nenhuma despesa encontrada</p>
        </CardContent>
      </Card>
    );
  }

    return (
    <Card className="w-72 h-full m-4 shadow-lg p-0">
      <CardHeader className="flex p-4">
        <CardTitle className="text-xl font-semibold">
        Despesas de {selectedMonth}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <DynamicChart
          type="donut"
          width={"300px"}
          height={"100%"}
          series={!expensesValues ? [0] : expensesValues.reverse()}
          options={{
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: -90,
                offsetY: -4,
                customScale: 1,
                donut: {
                  size: "60%",
                  background: "transparent",
                  labels: {
                    show: true,
                    total: {
                      formatter: function (val) {
                        const brl = parseFloat(val).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        });
                        return brl;
                      },
                    },
                    name: {
                      show: true,
                      fontSize: "13px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      offsetY: 73,
                    },
                    value: {
                      show: true,
                      fontSize: "12px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      offsetY: 73,
                      color: theme === "dark" ? "white" : "black",
                      formatter: function (val) {
                        const brl = parseFloat(val).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        });
                        return brl;
                      },
                    },
                  },
                },
              },
            },
            labels: !expensesNames ? [] : expensesNames.reverse(),
            legend: {
              floating: true,
              width: 150,
              height: 130,
              fontSize: "12px",
              offsetX: 14,
              offsetY: -15,
              fontFamily: "Inter, sans-serif",
              fontWeight: 12,
              labels: {
                colors: theme === "dark" ? "white" : "black",
              },
            },
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "12px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              },
            },
          }}
        />
      </CardContent>
    </Card>
    );
}

export default React.memo(MonthResume);
