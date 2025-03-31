"use client";
import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
