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

export function BookingForm() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<BookingSchema>({
    mode: "all",
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingSchema) => {
    console.log(data);
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
            <TableSelector onSelect={(tables) => setValue("tables", tables)} />
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

        <CardFooter>
          <Button type="submit" className="w-full">
            Book
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
