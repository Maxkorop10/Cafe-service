import { z } from "zod";

const now = new Date();

export const waiterBookingSchema = z
  .object({
    fullname: z
      .string()
      .min(2, "Provide data")
      .regex(
        /^(?:([A-Za-z]{2,}\s[A-Za-z]{2,})|([A-Za-z]{2,}\s[A-Za-z]{2,}\s[A-Za-z]{6,})|([А-ЯІЇЄҐа-яіїєґ']{2,}\s[А-ЯІЇЄҐа-яіїєґ']{2,})|([А-ЯІЇЄҐа-яіїєґ']{2,}\s[А-ЯІЇЄҐа-яіїєґ']{2,}\s[А-ЯІЇЄҐа-яіїєґ']{6,}))$/,
        "Provide valid full name",
      ),

    phone: z.string().regex(/^\+380\d{9}$/, "Provide correct data"),

    date: z.date({ required_error: "Date is required" }).refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Date must be today or in the future"),

    tables: z.array(z.number()).min(1, "Choose your table!"),

    start_time: z
      .string({ required_error: "Time is required" })
      .min(1, "Time is required"),

    end_time: z
      .string({ required_error: "Time is required" })
      .min(1, "Time is required"),
  })
  .superRefine(({ start_time, end_time, date }, ctx) => {
    if (!start_time || !end_time || !date) return;
    const convertTo24HourFormat = (timeStr: string) => {
      const [time, modifier] = timeStr.split(" ");
      const [hoursRaw, minutes] = time.split(":").map(Number);
      let hours = hoursRaw;

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      } else if (modifier === "AM" && hours === 12) {
        hours = 0;
      }
      return { hours, minutes };
    };

    const { hours: startHours, minutes: startMinutes } =
      convertTo24HourFormat(start_time);
    const { hours: endHours, minutes: endMinutes } =
      convertTo24HourFormat(end_time);
    const selectedStartTime = new Date(date);
    selectedStartTime.setHours(startHours, startMinutes, 0, 0);
    const selectedEndTime = new Date(date);
    selectedEndTime.setHours(endHours, endMinutes, 0, 0);

    if (selectedStartTime < now) {
      ctx.addIssue({
        path: ["start_time"],
        message: "Start time must be in the future",
        code: "custom",
      });
    }

    if (selectedEndTime <= selectedStartTime) {
      ctx.addIssue({
        path: ["end_time"],
        message: "End time must be later than start time",
        code: "custom",
      });
    }
  });

export type WaiterBookingSchema = z.infer<typeof waiterBookingSchema>;
