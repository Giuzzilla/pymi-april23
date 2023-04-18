import { DefaultService } from './fastapi-client'
import { Stateful } from './Stateful'

export function FastAPI (): JSX.Element {
  return Stateful({
    key: 'fastapi',
    editTodo: async (id, params) => {
      await DefaultService.editTodo(id, params)
    },
    createTodo: async (title) => {
      await DefaultService.createTodo({ title })
    },
    getTodos: DefaultService.getTodos
  })
}
