import type { api } from "@/trpc/server";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SportoviskoComponent(
  props: Awaited<ReturnType<typeof api.sportoviska.getAll>>[number],
) {
  return (
    <Link href={`/sportoviska/${props.id}`}>
      <div className="bg-dark-blue h-[400px] w-[300px] rounded-xl px-[3px] py-[3px] text-white">
        <Image
          src={props.pictures[0]?.image ?? ""}
          alt={props.name ?? ""}
          width={400}
          height={200}
          className="rounded-t-xl"
        />
        <div className="p-4">
          <p className="text-3xl">{props.name}</p>
          <p className="text-sm">{props.info}</p>
        </div>
      </div>
    </Link>
  );
}
