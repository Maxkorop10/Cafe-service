"use client";

import BankPicker from "@/components/bank-picker";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { orderingSchema, OrderingSchema } from "./schema/schema";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useCartStore } from "@/shared/lib/store/cart-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  date: string;
  startTime: string;
  bookingTables: {
    table: {
      id: string;
      number: number;
    };
  }[];
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartPaymentFormProps = {
  totalPrice: number;
  items: CartItem[];
};

const CartPaymentForm: FC<CartPaymentFormProps> = ({ totalPrice, items }) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<OrderingSchema>({
    mode: "all",
    resolver: zodResolver(orderingSchema),
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const orderType = watch("orderType");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  useEffect(() => {
    if (orderType !== "TABLE") return;

    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/to-order");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, [orderType]);

  const onSubmit = async (data: OrderingSchema) => {
    const payload = {
      fullname: data.fullname,
      phone_number: data.phone,
      orderType: data.orderType,
      bookingId: data.orderType === "TABLE" ? data.booking : null,
      items,
      totalPrice,
    };

    try {
      if (totalPrice <= 0) {
        toast.error("Total sum can't be zero!");
        return;
      }

      if (items.filter((item) => item.quantity <= 0).length > 0) {
        toast.error("Quantity can't be zero or lower");
        return;
      }

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (totalPrice <= 0) {
        const error = await res.json();
        toast.error("Total sum can't be zero!", error.message);
        return;
      }

      if (!res.ok) {
        const error = await res.json();
        console.error("Order error:", error.message);
        return;
      }

      if (!res.ok) {
        const error = await res.json();
        toast.error("Order error:", error.message);
        return;
      }

      const responseData = await res.json();
      console.log("Order created:", responseData);
      toast.success("Order created successfully!", {
        description: "Your order has been sent to the waiter.",
        action: {
          label: "View",
          onClick: () => router.push("/orders-page"),
        },
      });

      clearCart();
    } catch (err) {
      console.error("Order request failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full border-0 shadow-none rounded-lg">
        <CardHeader className="px-6">
          <DialogTitle className="font-bold text-2xl text-gray-800 text-left">
            Спосіб оплати
          </DialogTitle>
          <DialogDescription>Оберіть спосіб оплати</DialogDescription>
        </CardHeader>

        <CardContent className="px-6 flex justify-center items-center">
          <BankPicker
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
        </CardContent>

        <CardContent className="px-6 pb-2 flex flex-col gap-3">
          <div>
            <p>ПІБ</p>
            <Input
              {...register("fullname")}
              className="border-gray-400"
              placeholder="Lisa Brown"
              id="fullname_input"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-2">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <p>Номер телефону</p>
            <Input
              {...register("phone")}
              className="border-gray-400"
              placeholder="+380XXXXXXXXX"
              id="phone_input"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          <p className="font-bold text-sm text-gray-800 text-left">
            Тип замовлення:
          </p>

          <Controller
            name="orderType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TAKEAWAY" id="r1" />
                  <Label htmlFor="r1" className="font-normal cursor-pointer">
                    З собою
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TABLE" id="r2" />
                  <Label htmlFor="r2" className="font-normal cursor-pointer">
                    Є столик
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.orderType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.orderType.message}
            </p>
          )}

          {orderType === "TABLE" && (
            <div className="flex flex-col gap-1 w-60">
              <label
                htmlFor="booking"
                className="text-sm font-medium text-gray-700"
              >
                Ваші бронювання
              </label>
              <select
                id="booking"
                {...register("booking")}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Оберіть бронювання</option>
                {bookings.map((booking) => (
                  <option key={booking.id} value={booking.id}>
                    {new Date(booking.startTime).toLocaleString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </option>
                ))}
              </select>
              {errors.booking && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.booking.message}
                </p>
              )}
            </div>
          )}

          <p className="font-bold text-sm text-gray-800 text-left">
            Сума: {totalPrice} грн.
          </p>
        </CardContent>
        <CardFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full"
              disabled={selectedIndex === null || !isValid}
            >
              Оплатити
            </Button>
          </DialogClose>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CartPaymentForm;
