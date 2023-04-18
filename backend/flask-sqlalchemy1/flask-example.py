from flask import Flask


app = Flask(__name__)

items_storage = {1: {"name": "Foo", "price": 42.0}, 2: {"name": "Bar", "price": 23.0}}


@app.route("/items/")
def read_items():
    return list(items_storage.values())


@app.route("/items/item_id")  # <int:item_id>
def read_item(item_id):
    return items_storage[item_id]
