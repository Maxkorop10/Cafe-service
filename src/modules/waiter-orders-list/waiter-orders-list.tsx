"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import WaiterOrderBox from "@/components/waiter-order-box";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import WaiterOrderDialog from "@/components/waiter-order-dialog";
import { ScrollArea } from "@/shared/ui/scroll-area";

type Order = {
  id: number;
  fullname: string;
  phone_number: string;
  status: "CREATED" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
  type: "TAKEAWAY" | "TABLE";
  totalPrice: number;
  bookingId?: number | null;
};

type OrderDetails = {
  id: number;
  totalPrice: number;
  items: {
    mealName: string;
    mealImg: string;
    quantity: number;
    price: number;
  }[];
};

export function WaiterOrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

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

  const fetchOrderDetails = async (orderId: number) => {
    try {
      const res = await fetch(`/api/orders/order-details/${orderId}`);
      const data = await res.json();
      setOrderDetails(data);
    } catch (error) {
      console.error("❌ Failed to fetch order details", error);
    }
  };

  const renderOrdersByStatus = (status: Order["status"]) =>
    orders
      .filter((order) => order.status === status)
      .map((order) => (
        <Dialog key={order.id} modal={false}>
          <DialogTrigger asChild>
            <div onClick={() => fetchOrderDetails(order.id)}>
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
            </div>
          </DialogTrigger>
          <DialogContent className="p-0 sm:max-w-sm z-50 bg-transparent shadow-none border-0">
            <DialogTitle className="sr-only">Order details</DialogTitle>
            <DialogDescription className="sr-only">
              Список страв у замовленні
            </DialogDescription>
            {orderDetails && orderDetails.id === order.id && (
              <WaiterOrderDialog
                orderId={orderDetails.id}
                items={orderDetails.items.map((item) => ({
                  meal_img: item.mealImg,
                  meal_name: item.mealName,
                  quantity: item.quantity,
                  price: item.price,
                }))}
              />
            )}
          </DialogContent>
        </Dialog>
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
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {renderOrdersByStatus("CREATED")}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="in_progress" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {renderOrdersByStatus("IN_PROGRESS")}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="completed" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {renderOrdersByStatus("COMPLETED")}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="rejected" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {renderOrdersByStatus("REJECTED")}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
