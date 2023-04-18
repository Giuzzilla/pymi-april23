from flask import Flask
from flask import request

from models import Todo, Session

app = Flask(__name__)


@app.route("/todos/")
def get_todos():
    with Session() as session:
        todos = session.query(Todo).order_by(Todo.id).all()
        return [todo.json for todo in todos]


@app.route("/todos/", methods=["POST"])
def create_todo():
    with Session() as session:
        data = request.json  # No type information on the JSON
        todo = Todo(
            title=data.get("title", "No title"), completed=False
        )  # No validation of title, could be anything
        session.add(todo)
        session.commit()
        return todo


@app.route("/todos/<int:item_id>/", methods=["PUT"])
def edit_todo(item_id):
    with Session() as session:
        todo = session.query(Todo).get(item_id + 1)
        data = request.json
        if "completed" in data:
            todo.completed = data["completed"]  # No type information
        if "title" in data:
            todo.title = data["title"]  # No type information
        session.commit()
        return todo
