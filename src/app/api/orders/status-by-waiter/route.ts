import { NextResponse } from "next/server";
import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { orderId, newStatus } = body;

    if (!orderId || !newStatus) {
      return NextResponse.json(
        { error: "orderId and newStatus are required" },
        { status: 400 },
      );
    }

    if (!Object.values(OrderStatus).includes(newStatus)) {
      return NextResponse.json(
        { error: "Invalid order status" },
        { status: 400 },
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Failed to update order status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
