"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import MenuBox from "@/components/menu-box";
import { ScrollArea } from "@/shared/ui/scroll-area";

type MenuItem = {
  id: number;
  meal_name: string;
  imageUrl: string;
  description: string;
  weight: number;
  price: number;
};

export function MenuList() {
  const [menuData, setMenuData] = useState<Record<string, MenuItem[]>>({
    meals: [],
    drinks: [],
    wine: [],
  });

  const fetchMenu = async (type: string, key: string) => {
    const res = await fetch(`/api/menu?class=${type}`);
    const data = await res.json();
    setMenuData((prev) => ({ ...prev, [key]: data }));
  };

  useEffect(() => {
    fetchMenu("Meal", "meals");
    fetchMenu("Drink", "drinks");
    fetchMenu("Wine", "wine");
  }, []);

  return (
    <Tabs defaultValue="meals" className="w-[700px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="meals">Страви</TabsTrigger>
        <TabsTrigger value="drinks">Напої</TabsTrigger>
        <TabsTrigger value="wine">Винна карта</TabsTrigger>
      </TabsList>

      <TabsContent value="meals" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {menuData.meals.map((item) => (
              <MenuBox
                key={item.id}
                id={item.id}
                icon={item.imageUrl || "/placeholder.jpg"}
                title={item.meal_name}
                description={item.description}
                weight={item.weight}
                price={item.price}
              />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="drinks" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {menuData.drinks.map((item) => (
              <MenuBox
                key={item.id}
                id={item.id}
                icon={item.imageUrl || "/placeholder.jpg"}
                title={item.meal_name}
                description={item.description}
                weight={item.weight}
                price={item.price}
              />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="wine" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {menuData.wine.map((item) => (
              <MenuBox
                key={item.id}
                id={item.id}
                icon={item.imageUrl || "/placeholder.jpg"}
                title={item.meal_name}
                description={item.description}
                weight={item.weight}
                price={item.price}
              />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
