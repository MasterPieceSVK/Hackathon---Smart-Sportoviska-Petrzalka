"use client";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CalendarComponent({ id }: { id: string }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  function toLocalDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (date) {
      router.push(`/rezervacia/${id}?date=${toLocalDateString(date)}`);
    }
  }, [date]);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(selectedDate) => {
        if (selectedDate) {
          // Ensure time is reset to avoid offset issues
          const correctedDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
          );
          setDate(correctedDate);
        }
      }}
      className="flex w-5/6 justify-center rounded-md border border-dark-blue sm:w-min"
    />
  );
}
