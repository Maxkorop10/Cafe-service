import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullname, phone_number, orderType, bookingId, items, totalPrice } =
      body;

    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const createdOrder = await prisma.order.create({
      data: {
        userId: user.id,
        fullname,
        phone_number,
        totalPrice,
        type: orderType === "TABLE" ? "TABLE" : "TAKEAWAY",
        bookingId: orderType === "TABLE" ? Number(bookingId) : null,
        orderItems: {
          create: items.map((item: { id: number; quantity: number }) => ({
            menuId: item.id,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(createdOrder, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
