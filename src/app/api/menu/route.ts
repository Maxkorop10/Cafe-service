import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(req: NextRequest) {
  const mealClass = req.nextUrl.searchParams.get("class");

  try {
    if (!mealClass || !["Meal", "Drink", "Wine"].includes(mealClass)) {
      return NextResponse.json(
        { error: "Invalid or missing meal_class" },
        { status: 400 },
      );
    }

    const menuItems = await prisma.menu.findMany({
      where: {
        meal_class: mealClass,
      },
    });

    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items." },
      { status: 500 },
    );
  }
}
