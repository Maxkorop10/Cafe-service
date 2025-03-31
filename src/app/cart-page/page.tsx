import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="py-4 px-5">
      <p className="text-gray-50">Cart page!</p>
    </div>
  );
}
