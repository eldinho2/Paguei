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
import { db } from "@/utils/db"
import { useLiveQuery } from "dexie-react-hooks";

import { useSelectedYear } from "@/stores/selectedYear-store"

export function SelectYearBill() {

  const expenses = useLiveQuery(() => db.expenses.toArray(), [])

  const years = expenses
    ? expenses
        .map((expense) => new Date(expense.createdAt).getFullYear())
        .filter((value, index, self) => self.indexOf(value) === index)
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
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
