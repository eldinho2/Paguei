import {
  Form,
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
  )
}