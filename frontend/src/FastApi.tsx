import React from 'react'
import { Todos } from './Todos'
import { DefaultService } from './fastapi-client'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function FastApi (): JSX.Element {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({
    queryKey: ['todos-fastapi'],
    queryFn: DefaultService.getTodos
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  const toggleTodo = async (id: number): Promise<void> => {
    if (data == null || data.length <= id) return
    await DefaultService.editTodo(id, { completed: !data[id].completed })
    await queryClient.invalidateQueries({ queryKey: ['todos-fastapi'] })
  }

  const renameTodo = async (id: number, newName: string): Promise<void> => {
    if (data == null || data.length <= id) return
    await DefaultService.editTodo(id, { title: newName })
    await queryClient.invalidateQueries({ queryKey: ['todos-fastapi'] })
  }

  const addTodo = async (newTodo: string): Promise<void> => {
    if (data == null) return
    await DefaultService.createTodo({ title: newTodo })
    await queryClient.invalidateQueries({ queryKey: ['todos-fastapi'] })
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
