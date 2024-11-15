"use client";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div>
      <h1 className="motion-preset-fade duration-1000">Home</h1>
      <button onClick={() => signIn("")}>Login</button>
      <h1 className="motion-preset-fade duration-1000">
        {session.data?.user.name ?? ""}
      </h1>
    </div>
  );
}
