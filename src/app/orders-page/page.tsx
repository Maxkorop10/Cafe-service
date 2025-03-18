import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <div className="py-4 px-5">
      <p className="text-gray-50">Orders page!</p>
    </div>
  );
}
