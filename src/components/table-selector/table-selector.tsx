"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { FC, useEffect, useState } from "react";

type Table = {
  id: number;
  capacity: number;
  price: number;
};

interface TableSelectorProps {
  onSelect: (tables: number[], prices: number[]) => void;
}

const TableSelector: FC<TableSelectorProps> = ({ onSelect }) => {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch("/api/tables-info");
        const data: Table[] = await res.json();
        setTables(data);
      } catch (error) {
        console.error("Failed to load tables-info", error);
      }
    };
    fetchTables();
  }, []);

  useEffect(() => {
    const selectedPrices = tables
      .filter((table) => selectedTables.includes(table.id))
      .map((table) => table.price);

    onSelect(selectedTables, selectedPrices);
  }, [selectedTables, tables, onSelect]);

  const toggleTable = (id: number) => {
    setSelectedTables((prev) =>
      prev.includes(id) ? prev.filter((table) => table !== id) : [...prev, id],
    );
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
            <HoverCard key={table.id}>
              <HoverCardTrigger asChild>
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center border rounded cursor-pointer",
                    selectedTables.includes(table.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300",
                  )}
                  onClick={() => toggleTable(table.id)}
                >
                  {table.id}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit h-fit">
                <p>Вмістимість: {table.capacity}</p>
                <p>Ціна: {table.price}₴</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TableSelector;
