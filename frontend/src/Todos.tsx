import React, { useState } from 'react'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export interface TodosProps {
  todos: Todo[]
  toggleTodo: (id: number) => void
  renameTodo: (id: number, newName: string) => void
  addTodo: (newTodo: string) => void
}

export function Todos ({
  todos,
  toggleTodo,
  renameTodo,
  addTodo
}: TodosProps): JSX.Element {
  const [newTodo, setNewTodo] = useState('')

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(event.target.value)
  }

  const handleNewTodoKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      addTodo(newTodo)
      setNewTodo('')
    }
  }

  const todoList = todos.map((todo, index) => {
    return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          toggleTodo(index)
        }}
      />
      <input
        type="text"
        defaultValue={todo.title}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return
          event != null && renameTodo(index, event.currentTarget.value)
        }}
      />
    </li>
    )
  })

  return (
    <div>
      <ul>
        {todoList}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={handleNewTodoChange}
        onKeyDown={handleNewTodoKeyDown}
      />
    </div>
  )
}
