import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { auth } from "@/server/auth";
export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
