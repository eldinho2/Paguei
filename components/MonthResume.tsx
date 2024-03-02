import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";
import { useTheme } from "next-themes";
import { useSelectedMonth } from "@/stores/selectedMonth-store";
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

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

function MonthResume({ expenses, incomes }: any) {
  const { theme } = useTheme();

  const month = useSelectedMonth((state: ISelectedMonth) => state.month); 

  const expensesSorted = expenses?.sort((a: any, b: any) => a.amount - b.amount);
  const expensesNames = expensesSorted?.map((expense: any) => expense.description);
  const expensesValues = expensesSorted?.map((expense: any) => expense.amount);
  

  const selectedMonth = months[month - 1];

  return (
    <div className="">
      <Card className="w-72 h-full m-4 shadow-lg p-0">
        <CardHeader className="flex p-4">
          <CardTitle className="text-xl font-semibold">
            Resumo de {selectedMonth}
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <DynamicChart
            type="donut"
            width={"300px"}
            height={"100%"}
            series = {!expensesValues ? [0] : expensesValues.reverse()}
            options={{
              plotOptions: {
                pie: {
                  startAngle: 0,
                  endAngle: 360,
                  expandOnClick: true,
                  offsetX: -15,
                  offsetY: -4,
                  customScale: 1,
                  donut: {
                    size: '60%',
                    background: 'transparent',
                    labels: {
                      show: true,
                      total: {
                        formatter: function (val) {
                          const brl = parseFloat(val).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                          return brl;
                        },
                      },
                      name: {
                        show: true,
                        fontSize: '13px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        offsetY: 73,
                      },
                      value: {
                        show: true,
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        offsetY: 73,
                        color: theme === "dark" ? "white" : "black",
                        formatter: function (val) {
                          const brl = parseFloat(val).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                          return brl;
                        },
                      },
                    }
                  },      
                }
              },
              labels: !expensesNames ? ["Sem despesas"] : expensesNames.reverse(),
              legend: {
                fontSize: "12px",
                offsetX: 15,
                offsetY: -15,
                fontFamily: 'Inter, sans-serif',
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
    </div>
  );
}

export default React.memo(MonthResume);