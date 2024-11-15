"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function DynamicUserButton() {
  const session = useSession();
  return (
    <div className="flex items-center">
      <Button variant={"link"}>Kontakt</Button>
      <Button variant={"link"}>Sportoviska</Button>
      <Button variant={"link"}>O nas</Button>
      {session?.data?.user.id ? (
        <div className="flex gap-2">
          <Button variant={"link"} onClick={() => signOut()}>
            Odhlasit sa
          </Button>
          <Avatar>
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
  );
}
