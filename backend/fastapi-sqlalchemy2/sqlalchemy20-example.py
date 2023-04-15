from sqlalchemy import select, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, MappedAsDataclass, mapped_column


class Base(MappedAsDataclass, DeclarativeBase):
    pass


class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str | None]


stmt = select(Item)

engine = create_engine("sqlite://")
with engine.connect() as connection:
    items = connection.scalars(stmt).all()
    for item in items:
        print(item.title)
