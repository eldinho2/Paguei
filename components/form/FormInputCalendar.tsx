import {
  FormField,
  FormItem,
} from "@/components/ui/form";

import { CalendarForm } from "./CalendarForm";
import { FormInputProps } from './formTypes'

export const FormInputCalendar = ({form, bill}: FormInputProps) => {
  return (
    <FormField
    control={form.control}
    name="createdAt"
    render={() => (
      <FormItem>
        <CalendarForm addForm={form} bill={bill} />
      </FormItem>
    )}
  />
  )
}