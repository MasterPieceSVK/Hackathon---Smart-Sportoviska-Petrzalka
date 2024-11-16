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
  id: z.string().optional(),
});

export const sportoviskaRouter = createTRPCRouter({
  getAll: publicProcedure
    .output(z.array(SportoviskoOutput))
    .input(SportoviskaInputSchema)
    .query(async ({ ctx: { db }, input: { q, id } }) => {
      return await db.sportovisko.findMany({
        where: {
          name: q ? { contains: q, mode: "insensitive" } : undefined,
          id: id ? { equals: id } : undefined,
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
