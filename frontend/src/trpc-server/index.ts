import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { publicProcedure, router } from './trpc'
import { db } from './db'
import { z } from 'zod'

const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean()
})

const appRouter = router({
  editTodo: publicProcedure
    .input(todoSchema)
    .mutation(async (opts) => {
      const { input } = opts

      const todo = await db.todo.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          completed: input.completed
        }
      })
      return todo
    }),
  createTodo: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const { input } = opts
      const todo = await db.todo.create({
        data: {
          title: input
        }
      })
      return todo
    }),
  getAllTodos: publicProcedure
    .query(async () => {
      const todos = await db.todo.findMany({
        orderBy: { id: 'asc' }
      })
      return todos
    })
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter
})

server.listen(3000)
