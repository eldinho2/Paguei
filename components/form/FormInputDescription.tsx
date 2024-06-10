import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormInputProps } from "./formTypes";

export const FormInputDescription = ({form, bill} : FormInputProps) => {
  return (
    <FormField
    control={form.control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel htmlFor="description">
          {bill === "expense" ? "Nome da Despesa" : "Nome da Renda"}
        </FormLabel>
        <FormControl>
          <Input {...field} id="description" />
        </FormControl>
      </FormItem>
    )}
  />
  )
}