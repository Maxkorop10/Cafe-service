import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to fetch users", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
