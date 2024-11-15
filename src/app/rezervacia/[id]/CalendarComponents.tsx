"use client";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CalendarComponent({ id }: { id: string }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  useEffect(() => {
    router.push(`/rezervacia/${id}?date=${date?.toISOString()}`);
  }, [date]);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
