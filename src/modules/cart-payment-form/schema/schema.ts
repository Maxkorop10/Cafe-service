import { z } from "zod";

export const orderingSchema = z.object({
  fullname: z
    .string()
    .min(2, "Provide data")
    .regex(
      /^(?:[A-Za-z]{2,}\s[A-Za-z]{2,}|[А-ЯІЇЄҐа-яіїєґ']{2,}\s[А-ЯІЇЄҐа-яіїєґ']{2,})$/,
      "Provide data",
    ),

  phone: z.string().regex(/^\+380\d{9}$/, "Provide correct data"),
  orderType: z.enum(["TAKEAWAY", "TABLE"], {
    required_error: "Choose your type!",
  }),
});

export type OrderingSchema = z.infer<typeof orderingSchema>;
