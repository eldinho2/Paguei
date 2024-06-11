import {
  CaretSortIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  RowData,
} from "@tanstack/react-table";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TypeBill = {
  id: string;
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  createdAt: string;
  expiresAt: string;
  updatedAt: string;
  installments: number;
};

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    billType: "expense" | "income";
    handleDeleteBill: (billType: string, id: string) => void;
    handleUpdateBill: (billType: string, id: string) => void;
    handleDropdownItemClick: (payment: TypeBill) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    dialogContent: TypeBill;
    setDialogContent: (value: TypeBill) => void;
  }
}

export const columns: ColumnDef<TypeBill>[] = [
  {
    accessorKey: "fixed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 mx-0 overflow-hidden whitespace-nowrap text-left text-ellipsis"
        >
          Fixa
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("fixed") ? "Sim" : "Não";
      return <div className="capitalize px-0">{value}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 mx-0 overflow-hidden whitespace-nowrap text-left text-ellipsis"
        >
          Descriçao
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("description") || `Sem Nome`}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 mx-0 overflow-hidden whitespace-nowrap text-left text-ellipsis"
        >
          Valor
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return (
        <div className="font-medium px-0 mx-0 overflow-hidden whitespace-nowrap text-left text-ellipsis">
          {formatted}
        </div>
      );
    },
  },
];