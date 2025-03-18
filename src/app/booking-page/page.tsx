import type { Metadata } from "next";
import { BookingForm } from "@/modules/booking-form";

export const metadata: Metadata = {
  title: "Booking",
};

export default function BookingPage() {
  return (
    <div className="py-9 px-5 flex justify-center items-center">
      <BookingForm />
    </div>
  );
}
