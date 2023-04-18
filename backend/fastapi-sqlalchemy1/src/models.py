from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    title = Column(String(30))
    completed = Column(Boolean)


engine = create_engine("sqlite:///todos.db")
Session = sessionmaker(bind=engine)
# NOT ASYNC!! In SQLA < 1.4 you could only use an additional library like `databases`

Base.metadata.create_all(engine)
