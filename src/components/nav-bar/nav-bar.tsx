"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { GoogleButton } from "@/components/google-button";
import { useSession } from "next-auth/react";

export function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role ?? "USER";

  const navItems = {
    USER: [
      { name: "Меню", href: "/menu-page" },
      { name: "Кошик", href: "/cart-page" },
      { name: "Бронювання", href: "/booking-page" },
    ],
    ADMIN: [
      { name: "Замовлення", href: "/waiter-orders" },
      { name: "Бронювання", href: "/waiter-bookings" },
    ],
    MANAGER: [
      { name: "Персонал", href: "/manager-staff" },
      { name: "Статистика", href: "/manager-stats" },
    ],
    SUPERADMIN: [{ name: "Користувачі", href: "/superadmin-page" }],
  };

  const dropdownItems = {
    USER: [
      <DropdownMenuItem key="orders">
        <Link href="/orders-page">Історія замовлень</Link>
      </DropdownMenuItem>,
      <DropdownMenuItem key="logout">
        <GoogleButton />
      </DropdownMenuItem>,
    ],
    ADMIN: [
      <DropdownMenuItem key="logout">
        <GoogleButton />
      </DropdownMenuItem>,
    ],
    MANAGER: [
      <DropdownMenuItem key="logout">
        <GoogleButton />
      </DropdownMenuItem>,
    ],
    SUPERADMIN: [
      <DropdownMenuItem key="logout">
        <GoogleButton />
      </DropdownMenuItem>,
    ],
  };

  return (
    <nav className="flex justify-between items-center p-4 text-white bg-black/55 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-500 firefox:bg-opacity-90">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <Image
            src="/cafe-logo.jpg"
            alt="Cafe Logo"
            width={48}
            height={48}
            className="rounded-full border-amber-600 border-3"
          />
        </Link>

        <div className="flex flex-col">
          <p>Restaurant | Cherkasy</p>
          <p>м. Черкаси, вул. Хрещатик, 29</p>
        </div>
      </div>

      <div className="flex items-center space-x-6 ml-auto text-[18px]">
        {navItems[role].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${
              pathname === item.href
                ? "text-blue-500 font-semibold"
                : "text-slate-200 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="/profile.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-50 max-w-fit">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {dropdownItems[role]}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
