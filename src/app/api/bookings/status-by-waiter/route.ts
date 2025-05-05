import { NextResponse } from "next/server";
import { PrismaClient, BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, newStatus } = body;

    if (!bookingId || !newStatus) {
      return NextResponse.json(
        { error: "bookingId and newStatus are required" },
        { status: 400 },
      );
    }

    if (!Object.values(BookingStatus).includes(newStatus)) {
      return NextResponse.json(
        { error: "Invalid booking status" },
        { status: 400 },
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
