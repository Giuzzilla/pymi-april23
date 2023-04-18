import React from 'react'
import { Todos } from './Todos'
import { DefaultService } from './fastapi-client'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function FastApi (): JSX.Element {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({
    queryKey: ['todos'],
    queryFn: DefaultService.getTodos
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  const toggleTodo = (id: number): void => {
    if (data == null || data.length <= id) return
    void DefaultService.editTodo(id, { completed: !data[id].completed }).catch(console.error).then(
      async () => { await queryClient.invalidateQueries({ queryKey: ['todos'] }) }
    )
  }

  const renameTodo = (id: number, newName: string): void => {
    if (data == null || data.length <= id) return
    void DefaultService.editTodo(id, { title: newName }).catch(console.error).then(
      async () => { await queryClient.invalidateQueries({ queryKey: ['todos'] }) }
    )
  }

  const addTodo = (newTodo: string): void => {
    if (data == null) return
    void DefaultService.createTodo({ title: newTodo }).catch(console.error).then(
      async (res) => { await queryClient.invalidateQueries({ queryKey: ['todos'] }) }
    )
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
