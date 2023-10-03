from typing import Annotated, AsyncIterator

from sqlalchemy import String, create_engine
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    MappedAsDataclass,
    mapped_column,
)
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession


str30 = Annotated[str, String(30)]
intpk = Annotated[int, mapped_column(primary_key=True)]


class Base(MappedAsDataclass, DeclarativeBase):
    pass


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[intpk]
    title: Mapped[str30 | None]
    completed: Mapped[bool] = mapped_column(default=False)


async def async_session() -> AsyncIterator[AsyncSession]:
    engine = create_async_engine(
        "sqlite+aiosqlite:///todos.db",
    )
    sessionmaker = async_sessionmaker(
        bind=engine,
        expire_on_commit=False,
    )
    async with sessionmaker() as session:
        yield session


Base.metadata.create_all(create_engine("sqlite:///todos.db"))
