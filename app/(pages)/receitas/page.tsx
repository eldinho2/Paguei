import Link from "next/link";
import CarouselComponent from "@/components/CarouselComponent";
import { MoveLeft, Search, MoreVertical, PlusCircle } from "lucide-react";

export default function Receitas() {
  return (
    <>
      <header className="fixed z-30 w-full flex justify-between items-center bg-[#252628]">
        <div className="flex justify-between items-center text-white w-full px-2">
          <div className="flex items-center justify-start">
            <Link href={"/dashboard"}>
              <MoveLeft />
            </Link>
            <div className="pl-1">
              <h1 className="font-semibold">Receitas</h1>
              <p className="text-white/75">
                <span className="text-white/60 pr-1 pt-1">R$</span>
                500.00
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
      <PlusCircle className="h-12 w-12 fixed bottom-10 right-10 rounded-full shadow-lg" />
    </>
  );
}
