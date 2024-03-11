import Link from "next/link";
import CarouselComponent from "@/components/CarouselComponent";
import { ChevronLeftIcon } from "lucide-react";
import AddIncomeDialogButton from "@/components/AddIncomeDialogButton";
import { ExpenseListTable } from "@/components/BillListTable/ExpensesListTable";

export default function Receitas() {
  return (
    <>
      <header className="fixed z-30 w-full flex justify-between items-center bg-[#252628]">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center text-white w-full px-2">
            <div className="flex items-center justify-start">
              <Link href={"/dashboard"}>
                <ChevronLeftIcon />
              </Link>
              <div className="pl-8">
                <h1 className="font-semibold">Receitas</h1>
                <p className="text-white/75">
                  <span className="text-white/60 pr-1 pt-1">R$</span>
                  500.00
                </p>
              </div>
            </div>
            <div>
              <AddIncomeDialogButton/>
            </div>
          </div>
          <div className="flex justify-center items-center">
          <CarouselComponent />
          </div>
        </div>
      </header>
      <main className="pt-14">
        <ExpenseListTable bill="income" />
      </main>
    </>
  );
}
