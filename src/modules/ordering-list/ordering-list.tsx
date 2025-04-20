"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import OrderBox from "@/components/order-box";
import BookingBox from "@/components/booking-box/booking-box";

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

export function OrderingList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

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

  return (
    <Tabs defaultValue="meals" className="w-[550px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="flex flex-col gap-3">
        {orders.map((order) => (
          <OrderBox
            key={order.id}
            id={order.id}
            fullname={order.fullname}
            phone={order.phone_number}
            status={order.status}
            type={order.type}
            booking_id={order.bookingId ?? undefined}
            price={order.totalPrice}
          />
        ))}
      </TabsContent>

      <TabsContent value="bookings" className="flex flex-col gap-3">
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
      </TabsContent>
    </Tabs>
  );
}
