from sqlalchemy import select, create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    title = Column(String)


stmt = select(Item)

engine = create_engine("sqlite://")
with engine.connect() as connection:
    items = connection.scalars(stmt).all()
    for item in items:
        print(item.title)
