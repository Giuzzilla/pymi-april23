from fastapi import FastAPI

from pydantic import BaseModel


class Item(BaseModel):
    name: str
    price: float


app = FastAPI()


items_storage = {
    1: Item(name="Foo", price=42.0),
    2: Item(name="Bar", price=23.0),
}


@app.get("/items/")
def read_items() -> list[Item]:
    return list(items_storage.values())


@app.get("/items/{item_id}")
def read_item(item_id: int) -> Item:
    return items_storage[item_id]
