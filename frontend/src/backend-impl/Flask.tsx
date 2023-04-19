import { Stateful } from '../todos/Stateful'

// Manually written client for Flask
async function getTodos (): Promise<Array<{ id: number, title: string, completed: boolean }>> {
  return await fetch('/api/flask/todos/').then(async res => await res.json())
}

async function editTodo (id: number, params: { title?: string, completed?: boolean }): Promise<void> {
  await fetch(`/api/flask/todos/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}

async function createTodo (title: string): Promise<void> {
  await fetch('/api/flask/todos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  })
}

export function Flask (): JSX.Element {
  return Stateful({
    key: 'flask',
    editTodo,
    createTodo,
    getTodos
  })
}
