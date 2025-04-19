import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      fullname,
      phone,
      totalSum,
      date,
      start_time,
      end_time,
      tables,
    } = body;

    const startTime = new Date(`${date}T${start_time}`);
    const endTime = new Date(`${date}T${end_time}`);

    const conflicts = await prisma.bookingTable.findMany({
      where: {
        tableId: { in: tables },
        booking: {
          date: new Date(date),
          AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
        },
      },
      include: {
        booking: true,
      },
    });

    if (conflicts.length > 0) {
      return NextResponse.json(
        { error: "Some tables are already booked for this time." },
        { status: 409 },
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        fullname,
        phone_number: phone,
        totalPrice: totalSum,
        date: new Date(date),
        startTime,
        endTime,
        bookingTables: {
          create: tables.map((tableId: number) => ({ tableId })),
        },
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error("Error creating booking:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
