"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"

import { useCreateExpense } from '@/utils/queries/create-expense'
import { useCreateIncome } from '@/utils/queries/create-income'

const formSchema = z.object({
  description: z.string(),
  amount: z
    .number({
      required_error: "O campo de 'Valor' é obrigatório.",
      invalid_type_error: "O campo de 'Valor' deve ser um número.",
    })
    .min(1, { message: 'O campo de "Valor" não pode ser vazio.' })
    .positive(),
  fixed: z.boolean(),
  userId: z.string(),
  date: z.string(),
});

type AddBillFormProps = {
  bill: "expense" | "income";
};

export default function AddBillForm({ bill }: AddBillFormProps) {
  const { addExpense } = useCreateExpense()
  const { addIncome } = useCreateIncome()

  function handleAddBIll(values: z.infer<typeof formSchema>) {
    if (bill === "expense") {
      addExpense(values);
    } else {
      addIncome(values);
    }
  }

  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: "",
      fixed: false,
      userId: userEmail,
      date: new Date().toISOString(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {    
    handleAddBIll(values);
  }

  const amount = form.watch("amount");
  const fixed = form.watch("fixed");


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-center">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">{
                bill === "expense" ? "Despesa" : "Renda"
              }</FormLabel>
              <FormControl>
                <Input {...field} id="description" />
              </FormControl>
              <FormMessage>{form.formState.errors.description?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="amount">Valor</FormLabel>
              <FormControl>
                <Input {...field} onChange={event => field.onChange(Number(event.target.value))} id="amount" type="number" />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fixed"
          render={() => (
            <FormItem>
              <FormLabel htmlFor="fixed"></FormLabel>
              <FormControl>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="rounded-md bg-black border border-grey/70 hover:border-white active:border-white focus:border-white p-2">
                  {fixed ? "Fixa mensal" : "Não recorrente"}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-white" align="end">
                <DropdownMenuItem
                  onClick={() => {
                    form.setValue("fixed", false);
                  }}
                >
                  Não recorrente
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    form.setValue("fixed", true );
                  }}
                >
                  Fixa mensal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              </FormControl>
            </FormItem>
          )}
        />
        {
          amount > 0 ? (
            <DialogClose type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 p-2">
              Adicionar
            </DialogClose>
          ) : (
            <Button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 p-2" disabled={!amount}>
              Adicionar
            </Button>
          )
        }
      </form>
    </Form>
  );
}
