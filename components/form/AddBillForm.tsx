"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DialogClose } from "@/components/ui/dialog";

import { useSession } from "next-auth/react";

import { useCreateExpense } from "@/utils/queries/create-expense";
import { useCreateIncome } from "@/utils/queries/create-income";
import { CalendarForm } from "./CalendarForm";
import { CalculatorAmountInput } from "./CalculatorAmountInput";

const formSchema = z.object({
  description: z.string(),
  amount: z
    .number()
    .min(1, { message: "O valor deve ser maior que 0" })
    .positive({ message: "O valor deve ser maior que 0" }),
  fixed: z.boolean(),
  installments: z
    .number()
    .min(1, { message: "A parcela deve ser maior que 1" })
    .nonnegative({ message: "O valor deve ser maior ou igual a 0" }),
  userId: z.string(),
  createdAt: z.string(),
  expiresAt: z.string(),
});

type AddBillFormProps = {
  bill: "expense" | "income";
};

export default function AddBillForm({ bill }: AddBillFormProps) {
  const [parcelaFormIsOpen, setParcelaFormIsOpen] = useState(false);

  const { addExpense } = useCreateExpense();
  const { addIncome } = useCreateIncome();

  function handleAddBIll(values: z.infer<typeof formSchema>) {
    if (bill === "expense") {
      addExpense(values);
    } else {
      addIncome(values);
    }
  }

  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: "",
      fixed: false,
      userId: userEmail,
      createdAt: new Date().toISOString(),
      installments: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleAddBIll(values);
    console.log(values);
  }

  const amount = form.watch("amount");
  const fixed = form.watch("fixed");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col justify-center"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">
                {bill === "expense" ? "Nome da Despesa" : "Nome da Renda"}
              </FormLabel>
              <FormControl>
                <Input {...field} className="w-[270px]" id="description" />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <span>Valor</span>
              <FormControl>
                <div>
                  <Input {...field} className="hidden" />
                  <CalculatorAmountInput addForm={form} field={field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fixed"
          render={() => (
            <FormItem>
              <FormLabel className="mr-4" htmlFor="fixed">
                {bill === "expense" ? "Despesa:" : "Renda:"}
              </FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className="rounded-md dark:bg-black bg-pink-100 border border-grey/70 hover:border-white active:border-white focus:border-white p-2">
                      {
                        parcelaFormIsOpen ? "Parcelada" : fixed ? "Fixa mensal" : "Não recorrente"
                      }
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="border border-white"
                    align="end"
                  >
                    <DropdownMenuItem
                      onClick={() => {
                        setParcelaFormIsOpen(false);
                        form.setValue("fixed", false);
                      }}
                    >
                      Não recorrente
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setParcelaFormIsOpen(false);
                        form.setValue("fixed", true);
                      }}
                    >
                      Fixa mensal
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setParcelaFormIsOpen(true);
                      }}
                    >
                      Parcelada
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
            </FormItem>
          )}
        />
        {parcelaFormIsOpen ? (
          <FormField
            control={form.control}
            name="installments"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="installments">Parcelas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event: { target: { value: string | number } }) =>
                      field.onChange(+event.target.value)
                    }
                    className="w-[270px]"
                    id="installments"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.installments?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        ) : null}
        <FormField
          control={form.control}
          name="userId"
          render={() => (
            <FormItem>
              <CalendarForm addForm={form} bill={bill} />
            </FormItem>
          )}
        />
        <DialogClose
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 p-2"
          disabled={!!form.formState.errors.installments?.message || !amount}
        >
          Adicionar
        </DialogClose>
      </form>
    </Form>
  );
}
