import { Stateful } from '../todos/Stateful'
import type { AppRouter } from '../../../backend/node/src/index'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc'
    })
  ]
})

export function ComponentTRPC (): JSX.Element {
  return Stateful({
    key: 'trpc',
    editTodo: async (id, params) => {
      await trpc.editTodo.mutate({ id: id + 1, title: params.title, completed: params.completed })
    },
    createTodo: async (newTodo) => {
      await trpc.createTodo.mutate(newTodo)
    },
    getTodos: () => trpc.getAllTodos.query()
  })
}
