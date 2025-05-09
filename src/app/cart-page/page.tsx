import type { Metadata } from "next";
import { CartItems } from "@/modules/cart-items";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="py-4 px-5">
      <div className="mx-auto max-w-3xl w-full p-3 rounded-2xl shadow-md flex flex-col items-center bg-slate-900/50 backdrop-filter backdrop-blur-lg border-1 border-slate-400 bg-opacity-30 firefox:bg-opacity-90">
        <h3 className="text-gray-50 font-bold text-2xl">Кошик</h3>
        <CartItems />
      </div>
    </div>
  );
}
