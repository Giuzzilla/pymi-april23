import React, { useState } from 'react'
import { Todos, type Todo } from './Todos'

export function Stateless (): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Learn TypeScript', completed: false }
  ])

  const toggleTodo = (id: number): void => {
    if (todos.length <= id) return
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const renameTodo = (id: number, newName: string): void => {
    if (todos.length <= id) return
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, title: newName } : todo
      )
    )
  }

  const addTodo = (newTodo: string): void => {
    setTodos(todos => {
      const newTodos = [...todos]
      const maxId = Math.max(...newTodos.map(todo => todo.id), 1)
      newTodos.push({ id: maxId + 1, title: newTodo, completed: false })
      return newTodos
    })
  }

  return (
    <Todos
      todos={todos}
      toggleTodo={toggleTodo}
      renameTodo={renameTodo}
      addTodo={addTodo}
    />
  )
}
