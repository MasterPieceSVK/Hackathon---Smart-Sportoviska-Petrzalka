"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";

import NavLinks from "./NavLinks";

export default function DynamicUserButton() {
  const session = useSession();
  return (
    <div className="flex items-center gap-10">
      <div className="hidden sm:block">
        <NavLinks />
      </div>

      <div>
        {session?.data?.user.id ? (
          <div className="flex items-center gap-2">
            <Button
              className="hidden border-2 border-primary bg-secondary text-lg text-primary hover:text-secondary sm:flex"
              onClick={() => signOut()}
            >
              Odhlasit sa
            </Button>
            <Avatar className="size-14">
              <AvatarImage
                src={session.data.user.image ?? ""}
                alt={session.data.user.name ?? ""}
              />
              <AvatarFallback>
                {session.data.user?.name?.slice(1, 2) ?? ""}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button onClick={() => signIn()}>Prihlasit sa</Button>
        )}
      </div>
    </div>
  );
}
