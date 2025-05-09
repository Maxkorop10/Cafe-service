// app/api/staff/change-staff-role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || token.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, newRole } = await req.json();
  const allowedRoles = ["USER", "MANAGER", "ADMIN"];

  if (!allowedRoles.includes(newRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  return NextResponse.json(updatedUser);
}
