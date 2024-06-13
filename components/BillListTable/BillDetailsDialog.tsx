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
import { BillType } from '@/types/billsType';

type BillsDetailsDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  bill: BillType;
  table: any;
};

export function BillsDetailsDialog({
  open,
  setOpen,
  bill,
  table,
}: BillsDetailsDialogProps) {
  const fullAmountValue = bill.amount * bill.totalInstallments;
  
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
                {bill.description || "Sem descrição"}
              </p>
              <p className="text-sm">
              {bill.totalInstallments > 1 && (
                <p className="text-sm pb-2">
                <span className="font-semibold">Valor Total: {fullAmountValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}</span>
                </p>
              )}
                <span className="font-semibold">{bill.totalInstallments > 1 ? 'Valor da parcela ' : 'Valor '}</span>
                {bill.amount?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              {bill.totalInstallments > 1 && (
                <p className="text-sm">
                  <span className="font-semibold">Parcelas: {bill.totalInstallments}</span>
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
              {bill.expiresAt && (
              <p className="text-sm">
                <span className="font-semibold">Data da ultima Parcela: </span>
                {new Date(bill.expiresAt).toLocaleString("pt-BR")}
              </p>
              )}
            </div>
          </div>
          <DialogFooter>
          <DialogClose>
            <Button
              variant="destructive"
              onClick={() => table.options?.meta?.handleDeleteBill?.(table.options?.meta?.billType, bill.id, bill.groupId, bill.totalInstallments)}
              
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
