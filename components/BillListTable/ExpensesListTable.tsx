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

import { useUpdateExpense } from "@/utils/queries/update-expense";
//import { useUpdateIncome } from "@/utils/queries/update-income";

import { columns } from "./TableColumns";
import { BillsDetailsDialog } from "./BillDetailsDialog";

import { TypeBill } from "./TableColumns";
import { TableBodyContent } from "./TableBodyContent";
import { TablePagination } from "./TablePagination";
import { TableFilterColumns } from "./TableFilterColumns";
import { useSelectedMonth } from "@/stores/selectedMonth-store";

import { useLiveQuery } from "dexie-react-hooks";

import { useEffect } from 'react';

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
  const [updateIsOpen, setUpdateIsOpen] = useState(false);

  //const month = useSelectedMonth((state) => state.month);

  function useDataByMonth(bill: string) {

    const { data: expensesDb } = useGetExpensesByMonth();    
    const { data: incomesDb } = useGetIncomesByMonth();
    
    const expenses = expensesDb;
    const incomes = incomesDb;

    return bill === "expense" ? expenses : incomes;
  }

  let data = useDataByMonth(bill);

  const { deleteExpense } = useDeleteExpense();
  const { deleteIncome } = useDeleteIncome();


  const handleDeleteBill = (billType: string, id: string) => {
    if (billType === "expense") {
      deleteExpense({ id });
    } else {
      deleteIncome({ id });
    }
  };

  const handleUpdateBill = (billType: string, id: string) => {
    if (billType === "expense") {
      console.log("updateExpense", { id });
      setUpdateIsOpen(true)
      //updateExpense({ id });
    } else {
      console.log("updateIncome", { id });
      // updateIncome({ id });
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
      handleUpdateBill: (billType, id) => handleUpdateBill(billType, id),
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

  if (updateIsOpen) {
    console.log('edit');
    
  }


  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (data) {
      timeout = setTimeout(() => {
        setShowSpinner(false);
      }, 700);
    } else {
      setShowSpinner(true);
    }

    return () => clearTimeout(timeout);
  }, [data]);

  if (showSpinner) {
    return (
      <div className="mt-96 flex justify-center items-center" role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="mt-96 flex justify-center items-center">
        <p>Nenhuma {bill === 'expense' ? 'despesa' : 'receita'} encontrada</p>
      </div>
    );
  }

  if (data && data.length > 0) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <BillsDetailsDialog bill={dialogContent} open={open} setOpen={setOpen} table={table} />
      <TableFilterColumns table={table} />
      <TableBodyContent table={table} columns={columns} data={data} />
      <TablePagination table={table} />
    </div>
  );
  }
}
