import React from 'react'
import { Todos } from './Todos'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { AppRouter } from './trpc-server/index'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000'
    })
  ]
})

export function tRPC (): JSX.Element {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => trpc.getAllTodos.query()
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  const toggleTodo = async (id: number): Promise<void> => {
    if (data == null || data.length <= id) return
    await trpc.editTodo.mutate({ id, title: data[id].title, completed: !(data[id].completed as boolean) })
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
  }

  const renameTodo = async (id: number, newName: string): Promise<void> => {
    if (data == null || data.length <= id) return
    await trpc.editTodo.mutate({ id, title: newName, completed: data[id].completed as boolean })
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
  }

  const addTodo = async (newTodo: string): Promise<void> => {
    if (data == null) return
    await trpc.createTodo.mutate(newTodo)
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
  }

  return (
    (data !== undefined)
      ? <Todos
      todos={data}
      toggleTodo={toggleTodo}
      renameTodo={renameTodo}
      addTodo={addTodo}
    />
      : <div>Loading...</div>
  )
}
