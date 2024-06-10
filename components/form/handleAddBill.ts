import { useCreateExpense } from "@/utils/queries/create-expense";
import { useCreateIncome } from "@/utils/queries/create-income";

export const HandleAddBill = (values, bill) => {
  const { addExpense } = useCreateExpense();
  const { addIncome } = useCreateIncome();

  if (bill === "expense") {
    addExpense(values);
  } else {
    addIncome(values);
  }
}