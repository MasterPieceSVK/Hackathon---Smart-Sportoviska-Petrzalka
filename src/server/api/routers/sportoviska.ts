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

const SportoviskaInputSchema = z.object({
  q: z.string(),
});

export const sportoviskaRouter = createTRPCRouter({
  getAll: publicProcedure
    .output(z.array(SportoviskoOutput))
    .input(SportoviskaInputSchema)
    .query(async ({ ctx: { db }, input: { q } }) => {
      return await db.sportovisko.findMany({
        where: {
          name: q ? { contains: q, mode: "insensitive" } : undefined,
        },
        select: {
          id: true,
          name: true,
          info: true,
          pictures: true,
        },
      });
    }),
});
