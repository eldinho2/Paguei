'use client'

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useSelectedYear } from "@/stores/selectedYear-store"
import { useGetExpensesByMonth } from "@/utils/queries/get-expenses-by-month"

export function SelectYearBill() {

  const { data: expensesDb } = useGetExpensesByMonth();    
  
  const years = expensesDb
    ? expensesDb
        .map((expense: { createdAt: string | number | Date; }) => new Date(expense.createdAt).getFullYear())
        .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index)
    : []

  const { updateSelecteYear } = useSelectedYear()
  const selectedYear = useSelectedYear((state) => state.year)

  return (
    <Select
      onValueChange={(value) => {
        updateSelecteYear(Number(value))
      }}
      defaultValue={String(selectedYear)}
    >
      <SelectTrigger className="py-2 px-4 rounded border-2 border-white/50 dark:text-white/75 text-black/75">
        <div className="flex gap-2">
        <p>Ano:</p>
        <SelectValue placeholder="year" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {years.map((year: number) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
