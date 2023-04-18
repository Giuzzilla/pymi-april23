import { Stateful } from './Stateful'
import type { AppRouter } from './trpc-server/index'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000'
    })
  ]
})

export function ComponentTRPC (): JSX.Element {
  return Stateful({
    key: 'trpc',
    editTodo: async (id, params) => {
      await trpc.editTodo.mutate({ id, title: params.title, completed: params.completed })
    },
    createTodo: async (newTodo) => {
      await trpc.createTodo.mutate(newTodo)
    },
    getTodos: trpc.getAllTodos.query
  })
}
