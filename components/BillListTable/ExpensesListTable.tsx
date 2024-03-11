"use client";

import { useState } from "react";
import {
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useGetExpensesByMonth } from "@/utils/queries/get-expenses-by-month";
import { useGetIncomesByMonth } from "@/utils/queries/get-incomes-by-month";

import { useDeleteExpense } from "@/utils/queries/delete-expense";
import { useDeleteIncome } from "@/utils/queries/delete-income";

import { columns } from "./TableColumns";
import { BillsDetailsDialog } from "./BillDetailsDialog";

import { TypeBill } from './TableColumns'
import { TableBodyContent } from "./TableBodyContent";
import { TablePagination } from "./TablePagination";
import { TableFilterColumns } from "./TableFilterColumns";

type BillListTableProps = {
  bill: "expense" | "income";
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

export function ExpenseListTable({ bill }: BillListTableProps) {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<TypeBill>({} as TypeBill);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  function useDataByMonth(bill: string) {
    const expenses = useGetExpensesByMonth();
    const incomes = useGetIncomesByMonth();

    return bill === "expense" ? expenses : incomes;
  }
  const { data, isLoading } = useDataByMonth(bill);

  const { deleteExpense } = useDeleteExpense();
  const { deleteIncome } = useDeleteIncome();

  const handleDeleteBill = (billType: string, id: string) => {
    if (billType === "expense") {
      deleteExpense({ id });
    } else {
      deleteIncome({ id });
    }
  };

  const handleDropdownItemClick = (payment: TypeBill) => {
    table.options?.meta?.setDialogContent?.(payment);
    table.options?.meta?.setOpen?.(true);
  };

  const table = useReactTable({
    data,
    columns,
    meta: {
      billType: bill,
      handleDeleteBill: (billType, id) => handleDeleteBill(billType, id),
      handleDropdownItemClick: (payment) => handleDropdownItemClick(payment),
      open,
      setOpen,
      dialogContent,
      setDialogContent,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {isLoading || (data && data?.length === 0) ? (
        <div>Nenhuma despesa...</div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center">
          <BillsDetailsDialog
            bill={dialogContent}
            open={open}
            setOpen={setOpen}
          />
          <TableFilterColumns table={table} />
          <TableBodyContent table={table} columns={columns} data={data} />
          <TablePagination table={table} />
        </div>
      )}
    </div>
  );
}
