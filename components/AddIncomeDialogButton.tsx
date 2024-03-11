import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusCircle } from "lucide-react";
import AddBillForm from "./form/addBillForm";

export default function AddIncomeDialogButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircle className="rounded-full bg-green-700 text-black shadow-lg" />
      </DialogTrigger>
      <DialogContent className="max-w-[300px] flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Adicionar Receita</DialogTitle>
        </DialogHeader>
        <AddBillForm bill="income" />
      </DialogContent>
    </Dialog>
  );
}
