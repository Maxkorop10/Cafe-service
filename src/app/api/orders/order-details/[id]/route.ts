import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const orderId = parseInt(id);

    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "Unknown orderId for this request." },
        { status: 400 },
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            menu: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const items = order.orderItems.map((item) => ({
      mealName: item.menu.meal_name,
      mealImg: item.menu.imageUrl || "",
      quantity: item.quantity,
      price: item.menu.price,
    }));

    return NextResponse.json({
      id: order.id,
      totalPrice: order.totalPrice,
      items,
    });
  } catch (error) {
    console.error("❌ Failed to fetch details", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
