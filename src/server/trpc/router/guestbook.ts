import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const guestbookRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.guestbook.findMany({
        select: {
          name: true,
          email: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            email: input.email,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
