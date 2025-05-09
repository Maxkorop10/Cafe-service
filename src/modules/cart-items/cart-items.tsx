"use client";

import { useCartStore } from "@/shared/lib/store/cart-store";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import CartPaymentForm from "@/modules/cart-payment-form";
import { ScrollArea } from "@/shared/ui/scroll-area";

export function CartItems() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {items.length === 0 && (
        <p className="text-white text-center text-lg font-medium">
          Кошик порожній
        </p>
      )}

      <ScrollArea
        className={`w-full rounded-2xl border transition-all duration-300 ${
          items.length === 0 ? "h-0" : "h-[350px]"
        }`}
      >
        <div className="flex flex-col gap-2 p-2 mr-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.weight} г • {item.price} грн
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-1">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="w-16 text-center border border-gray-300 rounded-lg px-3 py-1.5 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="border border-red-500 rounded-lg p-2 text-red-600 hover:bg-red-100 hover:border-red-600 hover:text-red-800 shadow-sm hover:shadow-md transition duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />
      <p className="text-white text-right text-lg font-medium">
        Загальна сума: {totalPrice} грн
      </p>
      <Separator />

      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="bg-blue-500 text-white hover:bg-blue-600 text-lg rounded-2xl h-12"
            disabled={items.length === 0}
          >
            Створити замовлення
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 sm:max-w-sm">
          <CartPaymentForm totalPrice={totalPrice} items={items} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
