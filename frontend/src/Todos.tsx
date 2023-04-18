import React, { useState, useRef } from 'react'

export interface Todo {
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
    const inputRef = useRef<HTMLInputElement>(null)

    return (
    <li key={index}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          toggleTodo(index)
        }}
      />
      <input
        type="text"
        ref={inputRef}
        defaultValue={todo.title}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return

          inputRef.current != null && renameTodo(index, inputRef.current.value)
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
