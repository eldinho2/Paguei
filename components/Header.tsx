import React from "react";
import CarouselComponent from "./CarouselComponent";
import { Menu } from "./Menu";

export default async function Header() {
  return (
    <header className="fixed z-20 w-full flex justify-center bg-[#252628] pl-6">
      <div className="flex items-center justify-center w-full">
        <CarouselComponent />
      </div>
      <div className="flex justify-end items-center pr-1">
        <Menu />
      </div>
    </header>
  );
}
