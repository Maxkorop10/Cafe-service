import { z } from "zod";

export const bookingSchema = z.object({
  fullname: z
    .string()
    .min(2, "Provide data")
    .regex(
      /^(?:[A-Za-z]{2,}\s[A-Za-z]{2,}|[А-ЯІЇЄҐа-яіїєґ']{2,}\s[А-ЯІЇЄҐа-яіїєґ']{2,})$/,
      "Provide data",
    ),

  phone: z.string().regex(/^\+380\d{9}$/, "Provide correct data"),

  date: z
    .date({ required_error: "Date is required" })
    .refine((date) => date >= new Date(), "Date must be in the future"),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
