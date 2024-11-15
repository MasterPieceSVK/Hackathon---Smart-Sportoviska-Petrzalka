"use client";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => signIn("discord")}>Login</button>
      <h1>{session.data?.user.name ?? ""}</h1>
    </div>
  );
}
