import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FormInputProps } from './formTypes';

export const FormInputFixed = ({form, bill, fixed, parcelaFormIsOpen, setParcelaFormIsOpen}: FormInputProps) => {
  return (
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
                  form.setValue("fixed", false);
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
  )
}