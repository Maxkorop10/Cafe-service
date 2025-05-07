"use client";

import WaiterBookingBox from "@/components/waiter-booking-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { BookingForm } from "@/modules/booking-form";
import { ScrollArea } from "@/shared/ui/scroll-area";

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
    <div className="flex flex-col-2 gap-2">
      <Tabs defaultValue="meals" className="w-[590px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="flex flex-col gap-3">
          <ScrollArea className="h-[470px] w-full rounded-2xl border">
            <div className="flex flex-col gap-2 p-2 mr-2">
              {renderBookingsByStatus("CREATED")}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="cancelled" className="flex flex-col gap-3">
          <ScrollArea className="h-[470px] w-full rounded-2xl border">
            <div className="flex flex-col gap-2 p-2 mr-2">
              {renderBookingsByStatus("CANCELLED")}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <Dialog modal={false}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="h-5 w-5" />
            Add new
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 sm:max-w-sm z-50 bg-transparent shadow-none border-0">
          <DialogTitle className="sr-only">Create new booking</DialogTitle>
          <DialogDescription className="sr-only">
            Create new Booking
          </DialogDescription>
          <BookingForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
