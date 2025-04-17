"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { DatePicker } from "@/shared/ui/date-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingSchema } from "@/modules/booking-form/schema";
import TableSelector from "@/components/table-selector";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BankPicker from "@/components/bank-picker";
import { toast } from "sonner";

export function BookingForm() {
  const { data: session } = useSession();
  const user_name = session?.user?.name;
  const [totalSum, setTotalSum] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<BookingSchema>({
    mode: "all",
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullname: "",
    },
  });

  const handleTableSelect = (tables: number[], prices: number[]) => {
    setValue("tables", tables);
    const sum = prices.reduce((acc, price) => acc + price, 0);
    setTotalSum(sum);
  };

  useEffect(() => {
    if (user_name) {
      reset({ fullname: user_name });
    }
  }, [user_name, reset]);

  const onSubmit = async (data: BookingSchema) => {
    try {
      const response = await fetch("/api/create-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          fullname: data.fullname,
          phone: data.phone,
          totalSum,
          date: data.date.toISOString().split("T")[0],
          start_time: data.start_time,
          end_time: data.end_time,
          tables: data.tables,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.error || "❌ Booking failed");
        return;
      }

      toast.success("✅ Booking successful!", {
        description: `Your table is reserved for ${data.date.toLocaleDateString()} at ${data.start_time}.`,
      });
      reset();
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[400px] max-h-fit">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-gray-800 text-left">
            Booking
          </CardTitle>
          <CardDescription>Book your table</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <BankPicker
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
        </CardContent>

        <CardContent>
          <p className="text-sm">Full Name</p>
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
        </CardContent>

        <CardContent className="flex flex-row gap-4">
          <div className="w-7/12">
            <p className="text-sm">Phone number</p>
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

          <div className="w-5/12">
            <p className="text-sm">Data</p>
            <DatePicker
              onChange={(date) => setValue("date", date ?? new Date())}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-2">{errors.date.message}</p>
            )}
          </div>
        </CardContent>

        <CardContent className="flex flex-row gap-4">
          <div className="w-1/3">
            <p className="text-sm">Your table</p>
            <TableSelector onSelect={handleTableSelect} />
            {errors.tables && (
              <p className="text-red-500 text-sm mt-2">
                {errors.tables.message}
              </p>
            )}
          </div>

          <div className="w-1/3">
            <p className="text-sm">Start time</p>
            <Input
              {...register("start_time")}
              type="time"
              className="border-gray-400"
              step="60"
              id="start_time"
            />
            {errors.start_time && (
              <p className="text-red-500 text-sm mt-2">
                {errors.start_time.message}
              </p>
            )}
          </div>

          <div className="w-1/3">
            <p className="text-sm">End time</p>
            <Input
              {...register("end_time")}
              type="time"
              className="border-gray-400"
              step="60"
              id="end_time"
            />
            {errors.end_time && (
              <p className="text-red-500 text-sm mt-2">
                {errors.end_time.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardContent>
          <p className="text-black text-right text-lg font-medium">
            Total sum: {totalSum} грн
          </p>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={selectedIndex === null || !isValid}
          >
            Book
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
