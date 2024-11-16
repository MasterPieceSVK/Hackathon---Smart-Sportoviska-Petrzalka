import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const GetReservationsInput = z.object({
  sportoviskoId: z.string(),
  date: z.date(),
});

// Define the structure of a single time slot
type TimeSlot = {
  time: Date; // Now a Date object
  available: boolean;
};

const CreateReservationInput = z.object({
  sportoviskoId: z.string(),
  timeInterval: z.array(z.date()).min(2),
});

export const reservationsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(GetReservationsInput)
    .output(
      z.array(
        z.object({
          time: z.date(), // Return as Date objects
          available: z.boolean(),
        }),
      ),
    )
    .query(async ({ ctx, input }) => {
      // Normalize the date to remove the time part
      const startOfDay = new Date(
        Date.UTC(
          input.date.getUTCFullYear(),
          input.date.getUTCMonth(),
          input.date.getUTCDate(),
          0,
          0,
          0,
          0, // Midnight in UTC
        ),
      );

      const endOfDay = new Date(
        Date.UTC(
          input.date.getUTCFullYear(),
          input.date.getUTCMonth(),
          input.date.getUTCDate(),
          23,
          59,
          59,
          999, // End of the day in UTC
        ),
      );

      // console.log("startOfDay", startOfDay);
      // console.log("endOfDay", endOfDay);

      // Query the reservations for the specified day
      const reservations = await ctx.db.reservation.findMany({
        where: {
          sportoviskoId: input.sportoviskoId,
          timeFrom: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
      // Create all possible 30-minute time slots for the day
      const timeSlots: TimeSlot[] = [];
      for (let hour = 5; hour <= 22; hour++) {
        for (const minute of [0, 30]) {
          const slotDate = new Date(startOfDay);
          slotDate.setHours(hour, minute, 0, 0);

          timeSlots.push({
            time: slotDate,
            available: true, // Default to available
          });
        }
      }
      // Mark times as unavailable based on reservations
      for (const reservation of reservations) {
        const reservationStart = new Date(reservation.timeFrom);
        const reservationEnd = new Date(reservation.timeTo);
        timeSlots.forEach((slot) => {
          if (slot.time >= reservationStart && slot.time < reservationEnd) {
            slot.available = false;
          }
        });
      }

      return timeSlots;
    }),
  create: protectedProcedure
    .input(CreateReservationInput)
    .mutation(async ({ ctx, input }) => {
      if (input.timeInterval.length < 2) {
        throw new Error("Time interval must have at least two dates");
      }

      const timeFrom = input.timeInterval[0];
      const timeTo = input.timeInterval[input.timeInterval.length - 1];

      if (!(timeFrom instanceof Date) || isNaN(timeFrom.getTime())) {
        throw new Error("Invalid timeFrom date");
      }

      if (!(timeTo instanceof Date) || isNaN(timeTo.getTime())) {
        throw new Error("Invalid timeTo date");
      }

      const reservation = await ctx.db.reservation.create({
        data: {
          sportoviskoId: input.sportoviskoId,
          timeFrom,
          timeTo,
          userId: ctx.session.user.id,
        },
      });

      return reservation;
    }),
});
