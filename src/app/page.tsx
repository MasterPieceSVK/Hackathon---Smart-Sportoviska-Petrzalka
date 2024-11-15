"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="grid h-full grid-cols-[2fr,1fr] place-items-center bg-[url('/background.png')]">
      <h1 className="ml-14 text-4xl font-semibold text-white">
        Nudis sa doma? <br /> Pod sportovat - rezervuj <br /> ihrisko a zacni
        hned!
      </h1>
      <Button
        onClick={async () => {
          if (!session.data) {
            await signIn();
          } else {
            router.push("/sportoviska");
          }
        }}
        className="ml-0 h-[70px] w-[300px] bg-light-blue text-2xl text-black hover:bg-light-blue/90"
      >
        Rezervovat
      </Button>
    </div>
  );
}
