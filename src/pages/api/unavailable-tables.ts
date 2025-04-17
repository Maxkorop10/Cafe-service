import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/shared/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { date, start, end } = req.query;

  if (!date || !start || !end) {
    return res.status(400).json({ error: "Missing params" });
  }

  try {
    const parsedDate = new Date(date as string);

    // Створюємо повноцінні DateTime об'єкти для порівняння
    const startDateTime = new Date(
      `${parsedDate.toISOString().split("T")[0]}T${start}:00.000Z`,
    );
    const endDateTime = new Date(
      `${parsedDate.toISOString().split("T")[0]}T${end}:00.000Z`,
    );

    const bookings = await prisma.booking.findMany({
      where: {
        date: parsedDate,
        OR: [
          {
            startTime: {
              lte: endDateTime,
            },
            endTime: {
              gte: startDateTime,
            },
          },
        ],
      },
      include: {
        bookingTables: true,
      },
    });

    const unavailableTableIds = bookings.flatMap((b) =>
      b.bookingTables.map((t) => t.tableId),
    );

    return res.status(200).json({ unavailableTableIds });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
