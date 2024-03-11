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
  updatedAt: string;
};

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    billType: "expense" | "income";
    handleDeleteBill: (billType: string, id: string) => void;
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
    header: "Fixa",
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
    cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const payment = row.original;
      const id = row.original.id;

      return (
        <div className="p-0 m-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 m-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4 p-0 m-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => table.options?.meta?.handleDropdownItemClick(payment)}
              >
                Ver Detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => table.options?.meta?.handleDeleteBill?.(table.options?.meta?.billType, id)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];