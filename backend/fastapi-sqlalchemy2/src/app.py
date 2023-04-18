from typing import Annotated

from fastapi import FastAPI, Depends, Response
from fastapi.routing import APIRoute
from pydantic import BaseModel
from sqlalchemy import select

from models import AsyncSession, async_session, Todo


DBSession = Annotated[AsyncSession, Depends(async_session)]


# See: https://fastapi.tiangolo.com/advanced/generate-clients/?h=generate+client
def custom_generate_unique_id(route: APIRoute):
    return f"{route.name}"


app = FastAPI(
    root_path="/api/fastapi",
    generate_unique_id_function=custom_generate_unique_id,
)


class TodoSchema(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        orm_mode = True


@app.get("/todos/")
async def get_todos(session: DBSession) -> list[TodoSchema]:
    stmt = select(Todo).order_by(Todo.id)
    todos = (await session.scalars(stmt)).all()
    return todos


class CreateTodoSchema(BaseModel):
    title: str = "No title"


@app.post("/todos/")
async def create_todo(request: CreateTodoSchema, session: DBSession) -> TodoSchema:
    todo = Todo(id=None, title=request.title, completed=False)  # Dataclass-style
    session.add(todo)
    await session.commit()
    return todo


class EditTodoSchema(BaseModel):
    title: str | None = None
    completed: bool | None = None


@app.put("/todos/{item_id}/")
async def edit_todo(
    item_id: int,
    request: EditTodoSchema,
    session: DBSession,
) -> TodoSchema:
    todo = await session.get(Todo, item_id + 1)
    if request.completed is not None:
        todo.completed = (
            request.completed
        )  # Full typing, both on the request and the model
    if request.title:
        todo.title = request.title
    await session.commit()
    return todo
