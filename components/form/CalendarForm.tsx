import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useSelectedMonth } from '@/stores/selectedMonth-store'

type CalendarFormProps = {
  bill: string | undefined,
  addForm: any
}

import { ptBR } from "date-fns/locale";
import { PopoverClose } from "@radix-ui/react-popover";

export function CalendarForm({ bill, addForm }:CalendarFormProps ) {
  const month = useSelectedMonth(state => state.month)
  
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setMonth(month - 1);
    return newDate;
  });
  
  useEffect(() => {
    if (!date) {
      setDate(new Date());
    }
    else {
      addForm.setValue('createdAt', date.toISOString());
    }
  }, [date, addForm]);

  if (bill === "expense") {
    bill = "despesa";
  } else {
    bill = "receita";
  }
  
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-sm mb-4">Para quando você deseja agendar essa {bill}?</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date
              ? format(date, "dd/MM/yyyy", { locale: ptBR })
              : new Date().toLocaleDateString("pt-BR")}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-auto p-0">
          <Calendar
            mode="single"
            locale={ptBR}
            selected={date}
            onSelect={(day) => setDate(day || new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
