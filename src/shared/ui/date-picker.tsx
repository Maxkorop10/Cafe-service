"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../lib/utils";
import { Calendar } from "./calendar";

export function DatePicker({
  onChange,
}: {
  onChange: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[139.34px] justify-start text-left font-normal truncate border-gray-400",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {date ? format(date, "PPP") : "Date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            onChange(selectedDate);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
