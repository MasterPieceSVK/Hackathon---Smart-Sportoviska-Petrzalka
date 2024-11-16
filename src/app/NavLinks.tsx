"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <Button variant={"link"} className="text-lg text-white" asChild>
        <Link href={"/eventy"}>Eventy</Link>
      </Button>
      <Button variant={"link"} className="text-lg text-white" asChild>
        <Link href={"/kontakt"}>Kontakt</Link>
      </Button>
      <Button variant={"link"} className="text-lg text-white" asChild>
        <Link href={"/sportoviska"}>Športoviská</Link>
      </Button>
      <Button variant={"link"} className="text-lg text-white" asChild>
        <Link href={"/onas"}>O nás</Link>
      </Button>
      <Button
        className="border-2 border-primary bg-pink text-lg text-primary hover:text-secondary sm:hidden"
        onClick={() => signOut()}
      >
        Odhlásiť sa
      </Button>
    </>
  );
}
