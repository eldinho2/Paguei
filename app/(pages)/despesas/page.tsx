"use client";

import Link from "next/link";
import CarouselComponent from "@/components/CarouselComponent";
import { ChevronLeftIcon } from "lucide-react";
import { ExpenseListTable } from "@/components/BillListTable/ExpensesListTable";
import AddExpenseDialog from "@/components/AddExpenseDialogButton";
import { useGetExpensesByMonth } from "@/utils/queries/get-expenses-by-month";
import { SelectYearBill } from "@/components/SelectYearBill";

export default function Despesas() {
  const { data, isLoading } = useGetExpensesByMonth();  
  return (
    <>
      <header className="fixed z-30 w-full flex justify-between items-center bg-[#252628]">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center text-white w-full px-2 gap-3">
            <div className="flex w-full items-center justify-start">
              <Link href={"/"}>
                <ChevronLeftIcon />
              </Link>
              <div className="pl-8">
                <h1 className="font-semibold">Despesas</h1>
                <p className="text-white/75">
                  {isLoading
                    ? "Carregando..."
                    : data?.length === 0
                    ? "Nenhuma despesa..."
                    : `Total: R$ ${data
                        ?.reduce(
                          (acc: any, curr: { amount: any }) =>
                            acc + curr.amount,
                          0
                        )
                        .toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}`}
                </p>
              </div>
            </div>
            <div>
              <SelectYearBill /> 
            </div>
            <div className="flex gap-4">
              <AddExpenseDialog />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <CarouselComponent />
          </div>
        </div>
      </header>
      <main className="pt-14">
        <ExpenseListTable bill="expense" />
      </main>
    </>
  );
}
