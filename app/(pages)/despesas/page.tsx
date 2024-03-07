import Link from "next/link";
import CarouselComponent from "@/components/CarouselComponent";
import { ChevronLeftIcon, Search, MoreVertical, PlusCircle } from "lucide-react";
import { ExpenseListTable } from "@/components/ExpensesListTable";

export default function Despesas() {
  return (
    <>
      <header className="fixed z-30 w-full flex justify-between items-center bg-[#252628]">
        <div className="flex justify-between items-center text-white w-full px-2">
          <div className="flex items-center justify-start">
            <Link href={"/dashboard"}>
              <ChevronLeftIcon />
            </Link>
            <div className="pl-1">
              <h1 className="font-semibold">Despesas</h1>
              <p className="text-white/75">
                <span className="text-white/60 pr-1 pt-1">R$</span>
                900.00
              </p>
            </div>
          </div>
          <div>
            <CarouselComponent />
          </div>
          <div className="flex gap-4">
            <Search />
            <MoreVertical />
          </div>
        </div>
      </header>
      <main className="pt-14">
        <div>
          <ExpenseListTable />
        </div>
      </main>
      <PlusCircle className="h-12 w-12 fixed bottom-10 right-10 rounded-full bg-red-700 shadow-lg" />
    </>
  );
}
