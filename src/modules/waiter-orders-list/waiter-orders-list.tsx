"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import WaiterOrderBox from "@/components/waiter-order-box";
import { useEffect, useState } from "react";

type Order = {
  id: number;
  fullname: string;
  phone_number: string;
  status: "CREATED" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
  type: "TAKEAWAY" | "TABLE";
  totalPrice: number;
  bookingId?: number | null;
};

export function WaiterOrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/get-by-waiter");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const renderOrdersByStatus = (status: Order["status"]) =>
    orders
      .filter((order) => order.status === status)
      .map((order) => (
        <WaiterOrderBox
          key={order.id}
          id={order.id}
          fullname={order.fullname}
          phone={order.phone_number}
          status={order.status}
          type={order.type}
          booking_id={order.bookingId ?? undefined}
          price={order.totalPrice}
          in_process={order.status === "CREATED"}
          completed={
            order.status === "IN_PROGRESS" || order.status === "CREATED"
          }
          rejected={
            order.status === "IN_PROGRESS" || order.status === "CREATED"
          }
        />
      ));

  return (
    <Tabs defaultValue="meals" className="w-[590px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="in_progress">In progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>

      <TabsContent value="new" className="flex flex-col gap-3">
        {renderOrdersByStatus("CREATED")}
      </TabsContent>

      <TabsContent value="in_progress" className="flex flex-col gap-3">
        {renderOrdersByStatus("IN_PROGRESS")}
      </TabsContent>

      <TabsContent value="completed" className="flex flex-col gap-3">
        {renderOrdersByStatus("COMPLETED")}
      </TabsContent>

      <TabsContent value="rejected" className="flex flex-col gap-3">
        {renderOrdersByStatus("REJECTED")}
      </TabsContent>
    </Tabs>
  );
}
