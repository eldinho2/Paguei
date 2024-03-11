import React from "react";
import CarouselComponent from "./CarouselComponent";
import { auth } from "@/lib/auth";
import LogoutBtn from "@/components/LogoutBtn";
import { redirect } from "next/navigation";
import { ModeToggle } from '@/components/ThemeToggle';

export default async function Header() {
  const session = await auth();

  if (!session?.user) {
    redirect("/dashboard");
  }

  return (
    <header className="fixed z-20 w-full flex justify-between items-center bg-[#252628] px-4">
        <ModeToggle className="bg-[#252628] border-2 border-white/50 text-white" />
        <CarouselComponent />
        <LogoutBtn />
    </header>
  );
}
