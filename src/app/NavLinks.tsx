"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <Button variant={"link"} className="text-lg text-white" asChild>
        <Link href={"/kontakt"}>Kontakt</Link>
      </Button>
      <Button variant={"link"} className="text-lg text-white" asChild>
        <Link href={"/sportoviska"}>Sportoviska</Link>
      </Button>
      <Button variant={"link"} className="text-lg text-white" asChild>
        <Link href={"/onas"}>O nas</Link>
      </Button>
      <Button
        className="bg-pink border-2 border-primary text-lg text-primary hover:text-secondary sm:hidden"
        onClick={() => signOut()}
      >
        Odhlasit sa
      </Button>
    </>
  );
}
