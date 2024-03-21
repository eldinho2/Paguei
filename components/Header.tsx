import React from "react";
import CarouselComponent from "./CarouselComponent";
import LogoutBtn from "@/components/LogoutBtn";
import { ModeToggle } from '@/components/ThemeToggle';

export default async function Header() {
  return (
    <header className="fixed z-20 w-full flex justify-between items-center bg-[#252628] px-4">
        <ModeToggle className="bg-[#252628] border-2 border-white/50 text-white" />
        <CarouselComponent />
        <LogoutBtn />
    </header>
  );
}
