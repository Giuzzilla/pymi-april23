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

  const reorderTodos = (oldIndex: number, newIndex: number): void => {
    // setTodos(todos => {
    //   const newTodos = [...todos]
    //   const [removed] = newTodos.splice(oldIndex, 1)
    //   newTodos.splice(newIndex, 0, removed)
    //   return newTodos
    // })
  }

  const addTodo = (newTodo: string): void => {
    // if (todos == null) return
    // DefaultService.createTodo({
    //   title: newTodo
    // }).catch(console.error)
    // getTodos()
  }

  return (
    (data !== undefined)
      ? <Todos
      todos={data}
      toggleTodo={toggleTodo}
      renameTodo={renameTodo}
      reorderTodos={reorderTodos}
      addTodo={addTodo}
    />
      : <div>Loading...</div>
  )
}
