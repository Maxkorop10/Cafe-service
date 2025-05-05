"use client";

import WaiterBookingBox from "@/components/waiter-booking-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useEffect, useState } from "react";

type Booking = {
  id: number;
  fullname: string;
  phone_number: string;
  date: string;
  startTime: string;
  endTime: string;
  bookingTables: {
    table: {
      id: number;
    };
  }[];
  status: "CREATED" | "CANCELLED";
  totalPrice: number;
};

export function WaiterBookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/get-by-waiter");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const renderBookingsByStatus = (status: Booking["status"]) =>
    bookings
      .filter((booking) => booking.status === status)
      .map((booking) => (
        <WaiterBookingBox
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
          cancelled={booking.status === "CREATED"}
        />
      ));

  return (
    <Tabs defaultValue="meals" className="w-[590px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>

      <TabsContent value="new" className="flex flex-col gap-3">
        {renderBookingsByStatus("CREATED")}
      </TabsContent>

      <TabsContent value="cancelled" className="flex flex-col gap-3">
        {renderBookingsByStatus("CANCELLED")}
      </TabsContent>
    </Tabs>
  );
}
