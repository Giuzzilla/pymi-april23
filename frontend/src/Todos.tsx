import { useState } from 'react';

export interface Todo {
  title: string;
  completed: boolean;
}

export interface TodosProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  renameTodo: (id: number, newName: string) => void;
  reorderTodos: (oldIndex: number, newIndex: number) => void;
  addTodo: (newTodo: string) => void;
}

export function Todos({
  todos,
  toggleTodo,
  renameTodo,
  reorderTodos,
  addTodo,
}: TodosProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <input
              type="text"
              value={todo.title}
              onChange={event => renameTodo(index, event.target.value)}
            />
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={handleNewTodoChange}
        onKeyDown={handleNewTodoKeyDown}
      />
    </div>
  );
}
