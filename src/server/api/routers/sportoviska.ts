import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const Picture = z.object({
  id: z.string(),
  image: z.string(),
});

const SportoviskoOutput = z.object({
  id: z.string(),
  name: z.string().nullable(),
  info: z.string().nullable(),
  pictures: z.array(Picture),
});

export const sportoviskaRouter = createTRPCRouter({
  getAll: publicProcedure
    .output(z.array(SportoviskoOutput))
    .query(async ({ ctx: { db } }) => {
      return await db.sportovisko.findMany({
        select: {
          id: true,
          name: true,
          info: true,
          pictures: true,
        },
      });
    }),
});
