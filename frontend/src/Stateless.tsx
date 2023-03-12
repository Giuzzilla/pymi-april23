import { useState } from 'react';
import { Todos, Todo } from './Todos';

export function Stateless() {
  const [todos, setTodos] = useState<Todo[]>([
    { title: 'Learn React', completed: false },
    { title: 'Learn TypeScript', completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const renameTodo = (id: number, newName: string) => {
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, title: newName } : todo
      )
    );
  };

  const reorderTodos = (oldIndex: number, newIndex: number) => {
    setTodos(todos => {
      const newTodos = [...todos];
      const [removed] = newTodos.splice(oldIndex, 1);
      newTodos.splice(newIndex, 0, removed);
      return newTodos;
    });
  };

  const addTodo = (newTodo: string) => {
    setTodos(todos => {
      const newTodos = [...todos];
      newTodos.push({ title: newTodo, completed: false });
      return newTodos;
    });
  };

  return (
    <Todos
      todos={todos}
      toggleTodo={toggleTodo}
      renameTodo={renameTodo}
      reorderTodos={reorderTodos}
      addTodo={addTodo}
    />
  );
}
