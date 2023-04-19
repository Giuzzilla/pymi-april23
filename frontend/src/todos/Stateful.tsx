import React from 'react'
import { Todos, type Todo } from './Todos'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface StatefulProps {
  key: string
  editTodo: (id: number, params: { title?: string, completed?: boolean }) => Promise<void>
  createTodo: (title: string) => Promise<void>
  getTodos: () => Promise<Todo[]>
}

export function Stateful ({
  key,
  editTodo,
  createTodo,
  getTodos
}: StatefulProps): JSX.Element {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({
    queryKey: [`todos-${key}`],
    queryFn: getTodos
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  const refreshTodos = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: [`todos-${key}`] })
  }

  const toggleTodo = async (id: number): Promise<void> => {
    if (data == null) return
    const todo = data.filter((el) => el.id === id)[0]
    if (todo === undefined) return
    await editTodo(id, { completed: !(todo.completed) })
    await refreshTodos()
  }

  const renameTodo = async (id: number, newName: string): Promise<void> => {
    if (data == null) return
    const todo = data.filter((el) => el.id === id)[0]
    if (todo === undefined) return
    await editTodo(id, { title: newName })
    await refreshTodos()
  }

  const addTodo = async (newTodo: string): Promise<void> => {
    if (data == null) return
    await createTodo(newTodo)
    await refreshTodos()
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
