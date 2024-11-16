"use server";

import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleNewReservation(
  timeInterval: Date[],
  id: string | undefined,
) {
  try {
    await api.reservations.create({
      sportoviskoId: id ?? "",
      timeInterval,
    });
    return {
      success: true,
      message: "Rezervacia bola uspesne vytvorena",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Nastala chyba pri vytvoreni rezervacie",
    };
  }
}
