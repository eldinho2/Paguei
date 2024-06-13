import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormInputProps } from './formTypes'

export const FormInputInstallments = ({form}: FormInputProps) => {
  return (
    <FormField
    control={form.control}
    name="totalInstallments"
    render={({ field }) => (
      <FormItem>
        <FormLabel htmlFor="totalInstallments">Parcelas</FormLabel>
        <FormControl>
          <Input
            type="number"
            min="1"
            step="1"
            {...field}
            onChange={(event: { target: { value: string | number } }) =>
              field.onChange(event.target.value === "" ? "" : +event.target.value)
            }
          />
        </FormControl>
        <FormMessage>
          {form.formState.errors.totalInstallments?.message}
        </FormMessage>
      </FormItem>
  )}
  />
  )
}