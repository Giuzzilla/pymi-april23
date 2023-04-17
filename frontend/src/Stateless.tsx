import React, { useState } from 'react'
import { Todos, type Todo } from './Todos'

export function Stateless (): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([
    { title: 'Learn React', completed: false },
    { title: 'Learn TypeScript', completed: false }
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

  const reorderTodos = (oldIndex: number, newIndex: number): void => {
    setTodos(todos => {
      const newTodos = [...todos]
      const [removed] = newTodos.splice(oldIndex, 1)
      newTodos.splice(newIndex, 0, removed)
      return newTodos
    })
  }

  const addTodo = (newTodo: string): void => {
    setTodos(todos => {
      const newTodos = [...todos]
      newTodos.push({ title: newTodo, completed: false })
      return newTodos
    })
  }

  return (
    <Todos
      todos={todos}
      toggleTodo={toggleTodo}
      renameTodo={renameTodo}
      reorderTodos={reorderTodos}
      addTodo={addTodo}
    />
  )
}
