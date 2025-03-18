import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import MenuBox from "@/components/menu-box";

export function MenuList() {
  return (
    <Tabs defaultValue="meals" className="w-[700px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="meals">Meals</TabsTrigger>
        <TabsTrigger value="drinks">Drinks</TabsTrigger>
        <TabsTrigger value="wine">Wine</TabsTrigger>
      </TabsList>

      <TabsContent value="meals" className="flex justify-between items-center">
        <MenuBox
          icon={"/interior-1.jpg"}
          title="Борщ"
          description="Бульйон, буряк, філе куряче, квасоля, картопля, капуста, морква, зелень та сметана."
          weight={100}
          price={120}
        />
      </TabsContent>

      <TabsContent value="drinks">
        <MenuBox
          icon={"/interior-1.jpg"}
          title="Еспресо"
          description="Кава 80% арабіки та 20% робусти. Розбавлено молоком коров'ячим пастеризов."
          weight={100}
          price={120}
        />
      </TabsContent>

      <TabsContent value="wine">
        <MenuBox
          icon={"/interior-1.jpg"}
          title="Шампанське"
          description="Вино ігристе. Франція, регіон Шампань. 1981 рік."
          weight={100}
          price={120}
        />
      </TabsContent>
    </Tabs>
  );
}
