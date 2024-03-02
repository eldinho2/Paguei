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

  //console.log(expenses);
  

  const month = useSelectedMonth((state: ISelectedMonth) => state.month); 

  const expensesNames = expenses?.map((expense: any) => expense.description);
  const expensesValues = expenses?.map((expense: any) => expense.amount);

  //console.log(expensesValues, expensesNames);

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
            height={"300px"}
            series = {!expensesValues ? [0] : expensesValues}
            options={{
              plotOptions: {
                pie: {
                  startAngle: 0,
                  endAngle: 360,
                  expandOnClick: true,
                  offsetX: -15,
                  offsetY: 0,
                  customScale: 1,
                  dataLabels: {
                      offset: 0,
                      minAngleToShowLabel: 10
                  }, 
                  donut: {
                    size: '80%',
                    background: 'transparent',
                    labels: {
                      show: false,
                      value: {
                        show: true,
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        color: undefined,
                        formatter: function (val) {
                          return 'R$ ' + val.toLocaleString();
                        }
                      },
                      total: {
                        show: false,
                        showAlways: false,
                        label: 'Total',
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        color: '#373d3f',
                      }
                    }
                  },      
                }
              },
              labels: !expensesNames ? ["Sem despesas"] : expensesNames,
              legend: {
                offsetX: 15,
                offsetY: -15,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 12,
                labels: {
                  colors: theme === "dark" ? "white" : "black",
                }
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