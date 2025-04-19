"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@radix-ui/react-label";

export function BookingPicker() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1 w-60">
      <Label htmlFor="booking" className="text-sm font-medium text-gray-700">
        Your Booking
      </Label>
      <Controller
        name="booking"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id="booking"
            className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select Booking</option>
            <option value="booking1">Booking 1</option>
            <option value="booking2">Booking 2</option>
          </select>
        )}
      />
      {errors.booking && (
        <p className="text-red-500 text-xs mt-1">
          {errors.booking.message?.toString()}
        </p>
      )}
    </div>
  );
}
