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
        {session?.data?.user?.id ? (
          <div className="flex items-center gap-4">
            <Button
              className="hidden border-white bg-pink text-primary text-white hover:text-secondary sm:flex"
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Odhlasit sa
            </Button>
            <Avatar className="size-14">
              <AvatarImage
                src={session.data.user.image ?? ""}
                alt={session.data.user.name ?? ""}
              />
              <AvatarFallback>
                {session.data.user?.name?.slice(0, 2) ?? ""}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button
            onClick={() => signIn()}
            className="hidden border-white bg-pink text-primary text-white hover:text-secondary sm:flex"
          >
            Prihlasit sa
          </Button>
        )}
      </div>
    </div>
  );
}
