import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings",
};

export default function WaiterBookingsPage() {
  return (
    <div className="py-4 px-5">
      <p className="text-gray-50">Waiter bookings page!</p>
    </div>
  );
}
