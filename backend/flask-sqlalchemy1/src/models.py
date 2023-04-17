from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    completed = Column(Boolean)

    @property
    def json(self):  # Need to specify a custom json property for the API
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed,
        }


engine = create_engine("sqlite:///todos.db")
Session = sessionmaker(bind=engine)

Base.metadata.create_all(engine)
