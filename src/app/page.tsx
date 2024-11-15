"use client";
import { signIn, useSession } from "next-auth/react";
import ProfileCard from "./components/ui/profileCard";

export default function Home() {
  const session = useSession();

  return (
    <>
      {session.data && (
        <ProfileCard
          meno={session.data.user.name}
          pic={session.data.user.image}
          mail={session.data.user.email}
        ></ProfileCard>
      )}
      <div>
        <h1 className="motion-preset-fade duration-1000">Home</h1>
        <button onClick={() => signIn("")}>Login</button>
      </div>
    </>
  );
}
