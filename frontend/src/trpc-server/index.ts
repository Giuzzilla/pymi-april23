import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";
import { db } from "./db";
import { z } from "zod";

const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean()
});

const appRouter = router({
  editTodo: publicProcedure
    .input(todoSchema)
    .query(async (opts) => {
      const { input } = opts;

      return await db.todo.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          completed: input.completed
        }
      })
    }),
  createTodo: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      return await db.todo.create({
        data: {
          title: input
        }
      });
    }),
  getAllTodos: publicProcedure
    .query(async () => {
      return await db.todo.findMany({
        orderBy: { id: "asc" }
      })
    })
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter
});

server.listen(3000);

