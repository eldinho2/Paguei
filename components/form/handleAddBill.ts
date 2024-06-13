import { useCreateExpense } from "@/utils/queries/create-expense";
import { useCreateIncome } from "@/utils/queries/create-income";

import { CreateBillType } from "@/types/billsType";

export const HandleAddBill = (values: CreateBillType, bill: string) => {
  const { addExpense } = useCreateExpense();
  const { addIncome } = useCreateIncome();

  if (bill === "expense") {
    addExpense(values);
  } else {
    addIncome(values);
  }
}