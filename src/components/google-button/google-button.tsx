"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/shared/ui/button";

export function GoogleButton() {
  const { data: session } = useSession();

  return session ? (
    <Button onClick={() => signOut()} variant="outline" className="w-full">
      Log out ({session.user?.email})
    </Button>
  ) : (
    <Button
      onClick={() => signIn("google")}
      variant="outline"
      className="w-full"
    >
      Log in with Google
    </Button>
  );
}
