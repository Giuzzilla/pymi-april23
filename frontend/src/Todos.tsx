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
  const [editedTodos, setEditedTodos] = useState<Map<number, string>>()

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
    const saveTitle = editedTodos?.get(todo.id) !== todo.title ? editedTodos?.get(todo.id) : undefined

    return (
    <div key={todo.id}>
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
        onChange={(event) => {
          const newEditedTodos = new Map(editedTodos)
          newEditedTodos.set(todo.id, event.currentTarget.value)
          setEditedTodos(newEditedTodos)
        }}
        disabled = {todo.completed}
      />
      {(saveTitle != null) && <button onClick={() => {
        renameTodo(todo.id, saveTitle)
        const newEditedTodos = new Map(editedTodos)
        newEditedTodos.delete(todo.id)
        setEditedTodos(newEditedTodos)
      }}>Save</button>}
    </div>
    )
  })

  return (
    <div>
      {todoList}
      <input
        type="text"
        value={newTodo}
        onChange={handleNewTodoChange}
        onKeyDown={handleNewTodoKeyDown}
      />
      {
        (newTodo !== '') && <button onClick={() => {
          addTodo(newTodo)
          setNewTodo('')
        }}>Add</button>
      }
    </div>
  )
}
