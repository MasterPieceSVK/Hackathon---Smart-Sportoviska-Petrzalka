import CalendarComponent from "./CalendarComponents";
import { api } from "@/trpc/server";
import TimeSlots from "./TimeSlots";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };

  searchParams?: { date: string | undefined };
}) {
  // async function getReservations(){

  // }
  const sportovisko = await api.sportoviska.getAll({ id: params.id, q: "" });
  const { id } = params;
  const date = new Date(searchParams?.date ?? "1970-11-11T23:00:00.000Z");
  const timeSlots = await api.reservations.getAll({
    sportoviskoId: id,
    date: date ?? undefined,
  });
  return (
    <div className="mt-10 h-full">
      {sportovisko && (
        <>
          <p className="text-center text-4xl">{sportovisko[0]?.name}</p>
          <p className="text-center">{sportovisko[0]?.info}</p>
        </>
      )}
      <div className="flex flex-col items-center justify-center gap-6 sm:mt-0 sm:flex-row">
        <CalendarComponent id={id} />
        <TimeSlots timeSlots={timeSlots} day={date} />
      </div>
    </div>
  );
}
