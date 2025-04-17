"use client";

import { FC, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { TableSelectorProps } from "@/components/table-selector/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";

const tables = Array.from({ length: 8 }, (_, i) => i + 1);

const TableSelector: FC<TableSelectorProps> = ({ onSelect }) => {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);

  const toggleTable = (id: number) => {
    setSelectedTables((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((table) => table !== id)
        : [...prev, id];

      onSelect(newSelected);
      return newSelected;
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[84.83px] truncate text-left px-2 border-gray-400"
        >
          {selectedTables.length > 0
            ? `Tables: ${selectedTables.join(", ")}`
            : "Open"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="border border-gray-400 p-2 grid grid-cols-4 gap-2">
          {tables.map((table) => (
            <HoverCard key={table}>
              <HoverCardTrigger asChild>
                <div
                  key={table}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center border rounded cursor-pointer",
                    selectedTables.includes(table)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300",
                  )}
                  onClick={() => toggleTable(table)}
                >
                  {table}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit h-fit">
                <p>Capacity:</p>
                <p>Price:</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TableSelector;
