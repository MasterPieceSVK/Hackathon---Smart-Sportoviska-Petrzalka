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
  const { id } = params;
  const sportovisko = await api.sportoviska.getAll({ id: id, q: "" });
  const date = new Date(searchParams?.date ?? new Date().toISOString());
  console.log("Date", date);
  const timeSlots = await api.reservations.getAll({
    sportoviskoId: id,
    date,
  });

  return (
    <div className="mt-10 flex h-full flex-col items-center gap-5">
      {sportovisko && (
        <div className="w-4/6">
          <p className="text-center text-4xl">{sportovisko[0]?.name}</p>
          <p className="text-center">{sportovisko[0]?.info}</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-dark-blue/10 p-4 sm:mt-0 sm:flex-row">
        <CalendarComponent id={id} />
        <TimeSlots timeSlots={timeSlots} day={date} />
      </div>
    </div>
  );
}