import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalculatorAmountInput } from "./CalculatorAmountInput";

import { FormInputProps } from './formTypes';

export const FormInputAmount = ({form}: FormInputProps) => {
  return (
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
  )
}