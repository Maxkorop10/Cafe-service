import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "USER" | "ADMIN" | "MANAGER";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: "USER" | "ADMIN" | "MANAGER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "ADMIN" | "MANAGER";
  }
}
