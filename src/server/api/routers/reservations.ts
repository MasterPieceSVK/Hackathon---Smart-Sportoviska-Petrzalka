import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Prisma } from "@prisma/client";

const GetReservationsInput = z.object({
  sportoviskoId: z.string(),
  date: z.date(),
});

// Define the structure of a single time slot
type TimeSlot = {
  time: string; // Full date and time string
  available: boolean;
};

// Define the structure of the output
type GetReservationsOutput = TimeSlot[];

export const reservationsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(GetReservationsInput)
    .output(z.array(z.object({ time: z.string(), available: z.boolean() }))) // Define the output type
    .query(async ({ ctx, input }): Promise<GetReservationsOutput> => {
      // Normalize the date to remove the time part
      const startOfDay = new Date(input.date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      // Query the reservations for the specified day
      const reservations = await ctx.db.reservation.findMany({
        where: {
          sportoviskoId: input.sportoviskoId,
          timeFrom: {
            gte: startOfDay, // Reservations after midnight
            lte: endOfDay, // Reservations before end of day
          },
        },
      });

      // Create an array of all time slots (5:00, 5:30, ..., 23:30)
      const timeSlots: TimeSlot[] = [];
      for (let hour = 5; hour <= 22; hour++) {
        for (let minute of [0, 30]) {
          // Generate the full date and time string for each slot
          const slotDate = new Date(input.date);
          slotDate.setHours(hour, minute, 0, 0);

          timeSlots.push({
            time: slotDate.toISOString(), // Full date and time string (ISO format)
            available: true,
          });
        }
      }

      // Mark times as unavailable based on existing reservations
      for (const reservation of reservations) {
        const reservationStart = new Date(reservation.timeFrom);
        const reservationEnd = new Date(reservation.timeTo);

        timeSlots.forEach((slot) => {
          const slotDate = new Date(slot.time); // The time is now a full ISO string
          console.log(slotDate, reservationStart, reservationEnd);
          if (slotDate >= reservationStart && slotDate < reservationEnd) {
            slot.available = false;
          }
        });
      }
      console.log(timeSlots);
      return timeSlots;
    }),
});
