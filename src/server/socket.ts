// pages/api/unavailable-unavailable-tables-info.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { parseISO } from "date-fns";
import { prisma } from "@/shared/lib/prisma";
import "@/server/socket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  const { date, start, end } = req.query;

  if (
    typeof date !== "string" ||
    typeof start !== "string" ||
    typeof end !== "string"
  ) {
    return res.status(400).json({ message: "Invalid query params" });
  }

  const startTime = parseISO(`${date}T${start}`);
  const endTime = parseISO(`${date}T${end}`);

  const overlappingBookings = await prisma.booking.findMany({
    where: {
      OR: [
        {
          startTime: { lte: startTime },
          endTime: { gt: startTime },
        },
        {
          startTime: { lt: endTime },
          endTime: { gte: endTime },
        },
        {
          startTime: { gte: startTime },
          endTime: { lte: endTime },
        },
      ],
    },
    include: {
      bookingTables: true,
    },
  });

  const unavailableTableIds = overlappingBookings.flatMap((b) =>
    b.bookingTables.map((bt) => bt.tableId),
  );

  res.status(200).json({ unavailableTableIds });
}
