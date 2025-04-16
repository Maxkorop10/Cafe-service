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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { orderingSchema, OrderingSchema } from "./schema/schema";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@radix-ui/react-label";

export function CartPaymentForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = useForm<OrderingSchema>({
    mode: "all",
    resolver: zodResolver(orderingSchema),
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSubmit = (data: OrderingSchema) => {
    console.log("Data: ", data);
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

        <CardContent className="px-6">
          <BankPicker
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
        </CardContent>

        <CardContent className="px-6 pb-2 flex flex-col gap-3">
          <div>
            <p>Fullname</p>
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
            <p>Phone</p>
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
            Your type:
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
                    Takeaway
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TABLE" id="r2" />
                  <Label htmlFor="r2" className="font-normal cursor-pointer">
                    Table
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

          <p className="font-bold text-sm text-gray-800 text-left">Summa:</p>
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
}
