"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-[url('/background.png')] sm:grid sm:grid-cols-[2fr,1fr] sm:place-items-center">
      <h1 className="text-wrap px-3 text-center text-4xl font-semibold text-white sm:ml-14">
        Nudíš sa doma? <br /> Poď športovať - rezervuj ihrisko a začni hneď!
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
        Rezervovať
      </Button>
    </div>
  );
}
