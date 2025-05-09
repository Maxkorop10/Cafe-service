"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import UserBox from "@/components/user-box";
import { Search } from "lucide-react";

type Stars = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN" | "MANAGER";
  createdAt: string;
};

export function SuperadminPannel() {
  const [stars, setStars] = useState<Stars[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch("/api/all-stars");
        const data = await res.json();
        setStars(data);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, []);

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  const renderUsers = (role: "ADMIN" | "MANAGER" | "USER") =>
    stars
      .filter((user) => user.role === role)
      .filter(
        (user) =>
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((user) => (
        <UserBox
          key={user.id}
          id={user.id}
          userId={user.id}
          name={user.name || "Без імені"}
          email={user.email}
          createdAt={user.createdAt}
          fire={user.role !== "USER"}
          make_waiter={user.role !== "ADMIN"}
          make_manager={user.role !== "MANAGER"}
          onRoleChange={(newRole) =>
            setStars((prev) =>
              prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)),
            )
          }
        />
      ));

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Облік користувачів
          </h2>
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="ПІБ або email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 text-sm font-medium pl-9 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="managers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="managers">Менеджери</TabsTrigger>
          <TabsTrigger value="admins">Офіціанти</TabsTrigger>
          <TabsTrigger value="users">Клієнти</TabsTrigger>
        </TabsList>

        <TabsContent value="managers" className="flex flex-col gap-3">
          <ScrollArea className="h-[450px] w-full border">
            <div className="flex flex-col gap-2 p-2 mr-2">
              {renderUsers("MANAGER")}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="admins" className="flex flex-col gap-3">
          <ScrollArea className="h-[450px] w-full border">
            <div className="flex flex-col gap-2 p-2 mr-2">
              {renderUsers("ADMIN")}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="users" className="flex flex-col gap-3">
          <ScrollArea className="h-[450px] w-full border">
            <div className="flex flex-col gap-2 p-2 mr-2">
              {renderUsers("USER")}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
