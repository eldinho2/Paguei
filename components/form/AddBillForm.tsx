"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import {
  DialogClose
} from "@/components/ui/dialog";

import { useSession } from "next-auth/react";

import { FormInputProps } from './formTypes'

import { FormInputDescription } from "./FormInputDescription";
import { FormInputAmount } from "./FormInputAmount";
import { FormInputFixed } from "./FormInputFixed";
import { FormInputInstallments } from "./FormInputInstallments";
import { FormInputCalendar } from "./FormInputCalendar";

import { useCreateExpense } from "@/utils/queries/create-expense";
import { useCreateIncome } from "@/utils/queries/create-income";

const FormSchema = z.object({
  description: z.string(),
  amount: z
    .number()
    .min(1, { message: "O valor deve ser maior que 0" })
    .positive({ message: "O valor deve ser maior que 0" }),
  fixed: z.boolean(),
  installments: z.number().positive({ message: "O valor deve ser maior que 1"}).min(1, { message: "O valor deve ser maior que 1"}),
  createdAt: z.string(),
  userId: z.string(),
})


export function AddBillForm({bill}: FormInputProps) {
  const { addExpense } = useCreateExpense();
  const { addIncome } = useCreateIncome();

  const [parcelaFormIsOpen, setParcelaFormIsOpen] = useState(false);

  const { data: session } = useSession();

  const userEmail = session?.user.email;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      amount: 0,
      fixed: false,
      installments: 1,
      createdAt: new Date().toISOString(),
      userId: userEmail,
    },
  })

  function handleAddBIll(values: z.infer<typeof FormSchema>) {
    if (bill === "expense") {
      addExpense(values);
    } else {
      addIncome(values);
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    handleAddBIll(data);
  }

  const fixed = form.watch("fixed");
  const amount = form.watch("amount");
  const isSubmitDisabled = !!form.formState.errors.installments?.message || !amount || amount < 0;

  if (!parcelaFormIsOpen) {
    form.setValue("installments", 1);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInputDescription form={form} bill={bill} />
          <FormInputAmount form={form} />
          <FormInputFixed form={form} bill={bill} fixed={fixed} parcelaFormIsOpen={parcelaFormIsOpen} setParcelaFormIsOpen={setParcelaFormIsOpen} />
          {parcelaFormIsOpen && <FormInputInstallments form={form} />}
          <FormInputCalendar form={form} bill={bill} />
          <DialogClose asChild>
          <Button disabled={isSubmitDisabled} className="w-full" type="submit">
            Submit
          </Button>
        </DialogClose>
      </form>
    </Form>
  )
}