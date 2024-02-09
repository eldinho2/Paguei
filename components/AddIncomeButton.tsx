import { PlusCircle } from "lucide-react";
import Link from "next/link";

type AddIncomeButtonProps = {
  className: string;
};

export default function AddIncomeButton({ className }: AddIncomeButtonProps) {
  return (
    <Link href="/receitas/nova">
      <PlusCircle className={`cursor-pointer ${className}`} />
    </Link>
  );
}
