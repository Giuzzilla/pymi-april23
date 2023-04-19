import React, { useState } from 'react'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export interface TodosProps {
  todos: Todo[]
  toggleTodo: (id: number) => Promise<void>
  renameTodo: (id: number, newName: string) => Promise<void>
  addTodo: (newTodo: string) => Promise<void>
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
      addTodo(newTodo).catch(console.error)
      setNewTodo('')
    }
  }

  const todoList = todos.map((todo) => {
    const saveTitle = editedTodos?.get(todo.id) !== todo.title ? editedTodos?.get(todo.id) : undefined

    return (
    <div key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          toggleTodo(todo.id).catch(console.error)
        }}
      />
      <input
        type="text"
        defaultValue={todo.title}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return
          event != null && renameTodo(todo.id, event.currentTarget.value).catch(console.error)
        }}
        onChange={(event) => {
          const newEditedTodos = new Map(editedTodos)
          newEditedTodos.set(todo.id, event.currentTarget.value)
          setEditedTodos(newEditedTodos)
        }}
        disabled = {todo.completed}
      />
      {(saveTitle != null) && <button onClick={() => {
        renameTodo(todo.id, saveTitle).catch(console.error)
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
          addTodo(newTodo).catch(console.error)
          setNewTodo('')
        }}>Add</button>
      }
    </div>
  )
}
