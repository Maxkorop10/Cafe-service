import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = {
  USER: ["/menu-page", "/cart-page", "/booking-page", "/orders-page"],
  ADMIN: ["/waiter-orders", "/waiter-bookings"],
  MANAGER: ["/manager-staff", "/manager-stats"],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // console.log("JWT token role:", token?.role || "unauthenticated");

  if (pathname.startsWith("/menu-page")) {
    if (!token || token.role === "USER") {
      return NextResponse.next();
    }

    if (token.role === "ADMIN" || token.role === "MANAGER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!token || !token.role) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = token.role as keyof typeof protectedRoutes;
  const allowedRoutes = protectedRoutes[role];

  const isAllowed = allowedRoutes?.some((route) => pathname.startsWith(route));

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/menu-page",
    "/cart-page",
    "/booking-page",
    "/orders-page",
    "/waiter-orders",
    "/waiter-bookings",
    "/manager-staff",
    "/manager-stats",
  ],
};
