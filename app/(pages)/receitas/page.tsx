import Link from "next/link";
import CarouselComponent from "@/components/CarouselComponent";
import { MoveLeft, Search, MoreVertical, PlusCircle } from "lucide-react";
import OverviewCard from "@/components/OverviewCard";

export default function Receitas() {
  return (
    <>
      <header className="fixed z-30 w-full flex justify-center items-center bg-[#252628]">
        <div className="flex justify-between items-center text-white w-full p-2">
          <div className="flex items-center gap-8 justify-start">
            <Link href={"/"}>
              <MoveLeft />
            </Link>
            <div className="">
            <h1 className="font-semibold">Receitas</h1>
            <p className="text-white/75">
              <span className="text-white/60 pr-1 pt-1">R$</span>
              500.00
            </p>
          </div>
          </div>
          <div className="flex gap-4">
            <Search />
            <MoreVertical />
          </div>
        </div>
      </header>
      <section className="pt-20 w-full flex justify-center items-center bg-[#252628]">
        <CarouselComponent />
      </section>
      <OverviewCard />
      <OverviewCard />

      <OverviewCard />

      <OverviewCard />

      <OverviewCard />

      <OverviewCard />

      <OverviewCard />

      <OverviewCard />

      <OverviewCard />
      <PlusCircle className="h-12 w-12 text-white fixed bottom-10 right-10 bg-[#51e15d] rounded-full shadow-lg" />
    </>
  );
}
