import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: {
          include: {
            menu: true,
          },
        },
        booking: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
