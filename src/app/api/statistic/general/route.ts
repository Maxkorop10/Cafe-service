import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/shared/lib/prisma";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || token.role !== "MANAGER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orderTotal = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  const bookingTotal = await prisma.booking.aggregate({
    _sum: { totalPrice: true },
  });

  const incomeByType = await prisma.order.groupBy({
    by: ["type"],
    _sum: { totalPrice: true },
  });

  const incomeByStatus = await prisma.order.groupBy({
    by: ["status"],
    _sum: { totalPrice: true },
  });

  return NextResponse.json({
    incomeFromOrders: orderTotal._sum.totalPrice || 0,
    incomeFromBookings: bookingTotal._sum.totalPrice || 0,
    totalIncome:
      (orderTotal._sum.totalPrice || 0) + (bookingTotal._sum.totalPrice || 0),
    incomeByType,
    incomeByStatus,
  });
}
