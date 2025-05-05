import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        bookingTables: {
          include: {
            table: true,
          },
        },
      },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
