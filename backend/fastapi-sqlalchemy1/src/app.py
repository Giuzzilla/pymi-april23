from fastapi import FastAPI, Response
from fastapi.routing import APIRoute
from pydantic import BaseModel


from models import Todo, Session


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
        orm_mode = True  # Automatic conversion from SQLAlchemy model to Pydantic model


@app.get("/todos/")
def get_todos() -> list[TodoSchema]:
    with Session() as session:
        todos = session.query(Todo).order_by(Todo.id).all()
        # No need to specify a custom json property for the API
        # ..still no type information on the retrieved models (`list`)
        return todos


class CreateTodoSchema(BaseModel):
    title: str = "No title"  # Title optional with default and validated to be `str`!


@app.post("/todos/")
def create_todo(request: CreateTodoSchema) -> Response:
    with Session() as session:
        todo = Todo(title=request.title, completed=False)
        session.add(todo)
        session.commit()
        return Response(status_code=201)


class EditTodoSchema(BaseModel):
    title: str | None = None
    completed: bool | None = None


@app.put("/todos/{item_id}/")
def edit_todo(
    item_id: int,
    request: EditTodoSchema,
) -> Response:
    with Session() as session:
        todo = session.query(Todo).get(item_id + 1)
        if request.completed is not None:
            todo.completed = request.completed
        if request.title:
            todo.title = request.title
        session.commit()
        return Response(status_code=204)
