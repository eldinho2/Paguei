"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import { MinusCircle } from "lucide-react";
import AddBillForm from "./form/AddBillForm";


export default function AddExpenseDialogButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <MinusCircle className="rounded-full bg-red-700 text-black shadow-lg" />
      </DialogTrigger>
      <DialogContent className="max-w-[315px] h-[600px] flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Adicionar Despesa</DialogTitle>
        </DialogHeader>
        <AddBillForm bill="expense" />
      </DialogContent>
    </Dialog>
  );
}
