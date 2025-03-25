"use client";

import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function TimePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (time: string) => void;
}) {
  const [selectedTime, setSelectedTime] = useState(value);

  const timeOptions = Array.from(
    { length: ((22 - 11) * 60) / 15 + 1 },
    (_, i) => {
      const totalMinutes = 10 * 60 + i * 15;
      const hours = Math.floor(totalMinutes / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (totalMinutes % 60).toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  );

  return (
    <Select
      value={selectedTime}
      onValueChange={(time) => {
        setSelectedTime(time);
        onChange(time);
      }}
    >
      <SelectTrigger className="w-[106.4px]">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent className="max-h-64 overflow-auto">
        {timeOptions.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
