import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Github } from 'lucide-react';
import { Linkedin } from "lucide-react";

import LogoutBtn from "@/components/LogoutBtn";
import { ModeToggle } from '@/components/ThemeToggle';
import { SelectYearBill } from "@/components/SelectYearBill";

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <div className="flex flex-col gap-1">
            <div className="bg-white h-1 w-1 rounded-full" />
            <div className="bg-white h-1 w-1 rounded-full"  />
            <div className="bg-white h-1 w-1 rounded-full"  />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-2 mt-4">
        <SelectYearBill />
        <ModeToggle />
        </div>

        <SheetFooter>
          <SheetDescription className="flex justify-center fixed bottom-0 mb-4 gap-3">
          <LogoutBtn />
            <Link className="border border-gray-400 p-2" href="https://github.com/eldinho2" target="_blank" rel="noopener noreferrer">
              <Github />
            </Link>
            <Link className="border border-gray-400 p-2" href="https://br.linkedin.com/in/vinicius-saiao-goncalves" target="_blank" rel="noopener noreferrer">
              <Linkedin />
            </Link>
          </SheetDescription>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
