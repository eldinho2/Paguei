import { useState, useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

export function CalculatorAmountInput({ addForm, field }: any) {
  const [display, setDisplay] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const calcStructure = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [".", "0", "="],
    ["C", "✓", "DEL"],
  ];

  const operators = ["+", "-", "*", "÷"];
  

  const handleSetFieldValue = (value: string) => {
    const newValue = Number(display.replace(",", "."));
    if (display && addForm.getValues(field.name) !== newValue) {
      addForm.setValue(field.name, newValue);
    }
  
    console.log('field',field);
  }
  
  

  return (
    <Popover open={isOpen}>
      <PopoverTrigger>
      <Button
            variant={"outline"}
            className="w-[270px] pl-3 text-left font-normal"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {display}
          </Button> 
          <span>{
            display[0] === '-' ? 'Adicione um valor positivo' : ''
            }</span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-center items-center">
          <div className="">
            {calcStructure.map((row, i) => (
              <div
                key={i}
                className="flex justify-center items-center"
              >
                {row.map((item, j) => (
                  <button
                    key={j}
                    className="flex justify-center items-center m-2 p-2 rounded-md border-gray-500 border-2 w-10 h-10 text-lg"
                    disabled={
                      (item === "." &&
                        ["+", "-", "*", "÷", ".", ","].includes(
                          display[display.length - 1]
                        )) ||
                      (item === "✓" && /[\+\-\*÷]/.test(display) && display[0] !== '-')
                    }
                    onClick={() => {
                      if (item === "C") {
                        setDisplay("");
                        setError("");
                        return;
                      }
                      if (item === "DEL") {
                        setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
                        return;
                      }
                      if (item === "✓") {
                        if (!isNaN(Number(display[display.length - 1]))) {
                          handleSetFieldValue(display)
                          setIsOpen(false);
                        }
                        return;
                      }
                      if (item === "=") {
                        try {
                          let result = eval(
                            display.replace(",", ".").replace("÷", "/")
                          );
                          if (Number.isInteger(result)) {
                            setDisplay(String(result));
                          } else {
                            setDisplay(String(Number(result.toFixed(2))));
                          }
                        } catch (error) {
                          setError("Erro na expressão matemática");
                        }
                      } else if (["+", "-", "*", "÷"].includes(String(item))) {
                        if (
                          ["+", "-", "*", "÷"].includes(
                            display[display.length - 1]
                          )
                        ) {
                          setDisplay(
                            (prevDisplay) => prevDisplay.slice(0, -1) + item
                          );
                        } else {
                          setDisplay((prevDisplay) => prevDisplay + item);
                        }
                      } else if (item !== "=" && item !== "C") {
                        if (display === "0") {
                          setDisplay(String(item));
                        } else {
                          setDisplay(display + item);
                        }
                      }
                    }}
                  >
                  {item === "✓" &&
                  (isNaN(Number(display[display.length - 1])) ||
                    /[\+\-\*÷]/.test(display) && display[0] !== '-')
                    ? null
                    : item}
                  </button>
                ))}
                <div></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 mb-5 border-l-2 pl-4  m-2 p-2 border-white text-lg">
            {operators.map((operator, i) => (
              <button
                key={i}
                className="p-2 rounded-md border-gray-400 border-2 text-lg"
                onClick={() => {
                  const operator = operators[i];
                  if (
                    ["+", "-", "*", "÷"].includes(display[display.length - 1])
                  ) {
                    setDisplay(
                      (prevDisplay) => prevDisplay.slice(0, -1) + operator
                    );
                  } else {
                    setDisplay((prevDisplay) => prevDisplay + operator);
                  }
                }}
              >
                {operator}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
