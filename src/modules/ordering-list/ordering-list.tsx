"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import OrderBox from "@/components/order-box";
import BookingBox from "@/components/booking-box/booking-box";
import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import WaiterOrderDialog from "@/components/waiter-order-dialog";

interface Order {
  id: number;
  fullname: string;
  phone_number: string;
  status: string;
  type: string;
  bookingId?: number | null;
  totalPrice: number;
}

interface Booking {
  id: number;
  fullname: string;
  phone_number: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  bookingTables: {
    table: {
      id: number;
    };
  }[];
  totalPrice: number;
}

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

export function OrderingList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders/by-user", {
        headers: {},
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    };

    const fetchBookings = async () => {
      const res = await fetch("/api/bookings/by-user");

      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        console.error("Failed to fetch bookings");
      }
    };

    fetchOrders();
    fetchBookings();
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

  const renderOrders = () =>
    orders.map((order) => (
      <Dialog key={order.id} modal={false}>
        <DialogTrigger asChild>
          <div onClick={() => fetchOrderDetails(order.id)}>
            <OrderBox
              id={order.id}
              fullname={order.fullname}
              phone={order.phone_number}
              status={order.status}
              type={order.type}
              booking_id={order.bookingId ?? undefined}
              price={order.totalPrice}
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
    <Tabs defaultValue="meals" className="w-[550px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="orders">Замовлення</TabsTrigger>
        <TabsTrigger value="bookings">Бронювання</TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">{renderOrders()}</div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="bookings" className="flex flex-col gap-3">
        <ScrollArea className="h-[470px] w-full rounded-2xl border">
          <div className="flex flex-col gap-2 p-2 mr-2">
            {bookings.map((booking) => (
              <BookingBox
                key={booking.id}
                id={booking.id}
                fullname={booking.fullname}
                phone={booking.phone_number}
                date={booking.date}
                startTime={booking.startTime}
                endTime={booking.endTime}
                status={booking.status}
                bookingTables={booking.bookingTables.map((bt) => bt.table.id)}
                price={booking.totalPrice}
              />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
