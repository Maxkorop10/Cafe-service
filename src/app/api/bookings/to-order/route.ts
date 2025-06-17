import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/shared/lib/prisma";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: Request) {
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token || !token.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const now = new Date();

    const bookings = await prisma.booking.findMany({
      where: {
        userId: token.sub,
        status: "CREATED",
        date: {
          gte: today,
        },
        endTime: {
          gte: now,
        },
      },
      orderBy: {
        date: "asc",
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
    console.error("Error fetching upcoming bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
