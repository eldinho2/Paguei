import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Bill = {
  id: string;
  description: string;
  amount: number;
  fixed: boolean;
  createdAt: string;
  expiresAt: string;
  updatedAt: string;
  installments: number;
};

type BillsDetailsDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  bill: Bill;
  table: any;
};

export function BillsDetailsDialog({
  open,
  setOpen,
  bill,
  table,
}: BillsDetailsDialogProps) {
  return (
    <div>
      <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
        <DialogTrigger>
          <DialogClose />
        </DialogTrigger>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>Detalhes</DialogTitle>
          </DialogHeader>
          <div className="p-4 rounded shadow">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Descrição: </span>
                {bill.description}
              </p>
              <p className="text-sm">
                <span className="font-semibold">{bill.expiresAt ? 'Valor da parcela ' : 'Valor '}</span>
                {bill.amount?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              {bill.expiresAt && (
                <p className="text-sm">
                  <span className="font-semibold">Parcelas: </span>
                </p>
              )}
              <p className="text-sm">
                <span className="font-semibold">Tipo: </span>
                {bill.fixed ? "Despesa fixa" : "Despesa variável"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Data de criação: </span>
                {new Date(bill.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
          <DialogFooter>
          <DialogClose>
            <Button
              variant="destructive"
              onClick={() => table.options?.meta?.handleDeleteBill?.(table.options?.meta?.billType, bill.id)}
              
            >
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
