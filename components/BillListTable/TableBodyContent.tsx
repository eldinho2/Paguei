import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { ComponentType, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  table: any;
}

export function TableBodyContent<TData, TValue>({
  columns,
  table
}: DataTableProps<TData, TValue>) {
  return (
    <div className="rounded-md border w-[350px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: { id: Key | null | undefined; headers: any[]; }) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: { id: Key | null | undefined; getIsSelected: () => any; getVisibleCells: () => { id: Key | null | undefined; column: { columnDef: { cell: string | number | boolean | ReactPortal | PromiseLikeOfReactNode | ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; }; }; getContext: () => any; }[]; }) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="p-2 max-w-28 truncate"
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell
                    className="p-2 max-w-28 truncate"
                    key={cell.id}
                    onClick={() => {
                      table.options?.meta?.handleDropdownItemClick?.(cell.getContext().row.original);
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados. 😔
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
