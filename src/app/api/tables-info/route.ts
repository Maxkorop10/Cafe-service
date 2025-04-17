import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const tables = await prisma.tables.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(tables);
  } catch (error) {
    console.error("Failed to fetch tables-info:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
