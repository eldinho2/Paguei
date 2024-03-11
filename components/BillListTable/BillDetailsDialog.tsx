import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type Bill = {
  description: string;
  amount: number;
  fixed: boolean;
  createdAt: string;
  updatedAt: string;
};

type BillsDetailsDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  bill: Bill;
};

export function BillsDetailsDialog({ open, setOpen, bill }: BillsDetailsDialogProps) {
  return (
    <div>
      <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
        <DialogTrigger>
          <DialogClose />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Despesa</DialogTitle>
          </DialogHeader>
          <div className="p-4 rounded shadow">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Descrição:</span>
                {bill.description}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Valor:</span>
                {bill.amount?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Fixa:</span>
                {bill.fixed ? "Despesa fixa" : "Despesa variável"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Data de criação:</span>
                {new Date(bill.createdAt).toLocaleString("pt-BR")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Data de modificação:</span>
                {new Date(bill.updatedAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
