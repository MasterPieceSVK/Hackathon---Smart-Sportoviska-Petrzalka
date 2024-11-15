"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { api } from "@/trpc/server";

export default function TimeSlots({
  timeSlots,
  day,
}: {
  timeSlots: Awaited<ReturnType<typeof api.reservations.getAll>>;
  day: Date;
}) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]); // Store selected times as strings
  const [startTime, setStartTime] = useState<Date | null>(null); // Store selected start time
  const [endTime, setEndTime] = useState<Date | null>(null); // Store selected end time

  function handleAddSelectedTime(time: string) {
    const formattedTime = formatTime(time);

    // If deselecting the first time (start time), clear all selections
    if (
      selectedTimes.includes(formattedTime) &&
      formattedTime === selectedTimes[0]
    ) {
      setSelectedTimes([]); // Deselect all
      setStartTime(null); // Reset start time
      setEndTime(null); // Reset end time
      return;
    }

    // If deselecting a middle time, deselect everything after it
    if (selectedTimes.includes(formattedTime)) {
      const index = selectedTimes.indexOf(formattedTime);
      const newSelectedTimes = selectedTimes.slice(0, index); // Deselect everything after this time
      setSelectedTimes(newSelectedTimes);

      // If the end time was deselected, reset it
      if (formattedTime === formatTime(endTime || "")) {
        setEndTime(null);
      }
      return;
    }

    // Otherwise, add the time to the selections
    setSelectedTimes((prev) => [...prev, formattedTime]);
  }

  // Function to format the time in "HH:mm" format
  function formatTime(date: string): string {
    const time = new Date(date);
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(time);
  }

  // Check if the time is selected
  function isSelected(time: string): boolean {
    const formattedTime = formatTime(time);
    return selectedTimes.includes(formattedTime);
  }

  // Check if the time is within the valid time range (1.5 hours from start)
  function isInTimeWindow(time: string): boolean {
    if (!startTime) return true; // If no start time is selected, allow any time
    const selectedTime = new Date(time);
    const validEndTime = new Date(startTime.getTime() + 1.5 * 60 * 60 * 1000); // Add 1.5 hours to the start time
    return selectedTime >= startTime && selectedTime <= validEndTime;
  }

  // Handle start time selection
  function handleStartTimeSelection(time: string) {
    const formattedStartTime = new Date(time);
    setStartTime(formattedStartTime);
    setEndTime(null); // Reset end time when selecting a new start time
    setSelectedTimes([formatTime(time)]); // Only select the start time initially
  }

  // Handle end time selection
  function handleEndTimeSelection(time: string) {
    const formattedEndTime = new Date(time);
    setEndTime(formattedEndTime);
    const selectedTimesInRange = timeSlots
      .filter((timeSlot) => {
        const slotTime = new Date(timeSlot.time);
        return slotTime >= startTime && slotTime <= formattedEndTime;
      })
      .map((timeSlot) => formatTime(timeSlot.time));
    setSelectedTimes(selectedTimesInRange); // Select all times between the start and end times
  }

  console.log(timeSlots);

  return (
    <div>
      <div className="mt-2 grid grid-cols-4 gap-3 rounded-xl bg-dark-blue p-4 text-white sm:grid-cols-8">
        {timeSlots.map((timeSlot, i) => {
          const formattedTime = formatTime(timeSlot.time);
          const isValid = isInTimeWindow(timeSlot.time);

          return (
            <Button
              className={`${!timeSlot.available ? "line-through hover:bg-red-500" : ""} ${
                isSelected(timeSlot.time)
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-dark-blue"
              } rounded-xl p-1 text-center`}
              key={i}
              onClick={() => {
                if (!startTime) {
                  handleStartTimeSelection(timeSlot.time); // Select start time
                } else if (startTime && !endTime) {
                  handleEndTimeSelection(timeSlot.time); // Select end time
                } else {
                  handleAddSelectedTime(timeSlot.time); // Add or remove times
                }
              }}
              disabled={!isValid || !timeSlot.available} // Disable times outside the 1.5-hour window or unavailable slots
            >
              {formattedTime} {/* Show the formatted time */}
            </Button>
          );
        })}
      </div>
      {startTime && (
        <div className="flex flex-col items-center justify-between gap-2 rounded-xl bg-secondary p-4 sm:flex-row">
          {startTime && (
            <p>
              {startTime
                ? startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--:--"}
              :
              {endTime
                ? endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--:--"}
            </p>
          )}
          <Button className="bg-pink">Rezervovat</Button>
        </div>
      )}
    </div>
  );
}
