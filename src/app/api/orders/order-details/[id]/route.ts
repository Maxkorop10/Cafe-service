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
        { error: "Недійсний ID замовлення" },
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
      return NextResponse.json(
        { error: "Замовлення не знайдено" },
        { status: 404 },
      );
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
    console.error("❌ Помилка при отриманні деталей замовлення:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
