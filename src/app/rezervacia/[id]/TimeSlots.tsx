"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { api } from "@/trpc/server";
import { handleNewReservation } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export default function TimeSlots({
  timeSlots,
  sportoviskoId,
}: {
  timeSlots: Awaited<ReturnType<typeof api.reservations.getAll>>;
  sportoviskoId: string | undefined;
}) {
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  function handleAddSelectedTime(time: Date) {
    const isAlreadySelected = selectedTimes.some(
      (t) => t.getTime() === time.getTime(),
    );

    if (isAlreadySelected) {
      // Handle deselecting a time slot
      const index = selectedTimes.findIndex(
        (t) => t.getTime() === time.getTime(),
      );

      if (index === 0) {
        // If the first time (startTime) is deselected, reset everything
        setSelectedTimes([]);
        setStartTime(null);
        setEndTime(null);
      } else if (index === selectedTimes.length - 1) {
        // If the last time is deselected, update endTime to the previous time
        const newSelectedTimes = selectedTimes.slice(0, -1);
        setSelectedTimes(newSelectedTimes);
        setEndTime(newSelectedTimes[newSelectedTimes.length - 1] || null);
      } else {
        // Deselect all times after the deselected one
        const newSelectedTimes = selectedTimes.slice(0, index);
        setSelectedTimes(newSelectedTimes);
        setEndTime(newSelectedTimes[newSelectedTimes.length - 1] || null);
      }
    } else {
      // Handle selecting a time slot
      if (!startTime) {
        // If no startTime, set this as startTime and endTime
        setStartTime(time);
        setEndTime(time);
        setSelectedTimes([time]);
      } else if (time > endTime!) {
        // Extend the selection up to this time
        const newSelectedTimes = generateTimeRange(startTime!, time);
        setSelectedTimes(newSelectedTimes);
        setEndTime(time);
      }
    }
  }

  function generateTimeRange(start: Date, end: Date): Date[] {
    const times: Date[] = [];
    let currentTime = new Date(start);
    while (currentTime <= end) {
      times.push(new Date(currentTime));
      currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000); // Increment by 30 minutes
    }
    return times;
  }

  function isSelected(time: Date): boolean {
    return selectedTimes.some((t) => t.getTime() === time.getTime());
  }

  function isInTimeWindow(time: Date): boolean {
    if (!startTime) return true; // No restriction if no start time is set
    const maxEndTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour limit
    return time >= startTime && time <= maxEndTime;
  }

  const { toast } = useToast();

  async function handleReservation() {
    const result = await handleNewReservation(selectedTimes, sportoviskoId);
    if (result.success) {
      toast({
        title: result.message,
      });
      redirect("/");
    } else {
      toast({
        title: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <div className="mt-2 grid grid-cols-4 gap-3 rounded-xl bg-dark-blue p-4 text-white sm:grid-cols-8">
        {timeSlots.map((timeSlot, i) => {
          const { time, available } = timeSlot;
          const isValid = isInTimeWindow(time);

          return (
            <Button
              className={`${!available ? "line-through hover:bg-red-500" : ""} ${
                isSelected(time)
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-dark-blue"
              } rounded-xl p-1 text-center`}
              key={i}
              onClick={() => handleAddSelectedTime(time)}
              disabled={!isValid || !available}
            >
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-between gap-2 rounded-xl bg-secondary p-4 sm:flex-row">
        <p>
          {startTime
            ? startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--:--"}{" "}
          -{" "}
          {endTime
            ? endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--:--"}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <p>{selectedTimes.length * 5}€</p>
          <Button
            type="submit"
            className="bg-pink"
            disabled={selectedTimes.length < 2}
            onClick={handleReservation}
          >
            Rezervovat
          </Button>
        </div>
      </div>
    </div>
  );
}
