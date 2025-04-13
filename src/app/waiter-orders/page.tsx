import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

export default function WaiterOrdersPage() {
  return (
    <div className="py-4 px-5">
      <p className="text-gray-50">Waiter orders page!</p>
    </div>
  );
}
