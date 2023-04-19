# PyMi April '23 - "FastAPI and SQLAlchemy 2.0: Name a More Pythonic Duo"

Code for presentation @ [PyMi Meetup](https://milano.python.it/) (April 19th 2023)

The topic of the presentation was to show a comparison between typical web application stacks in the Python and the Typescript ecosystems.

There are two main comparisons:

- The capabilities in achieving end-to-end typesafety. By end-to-end, I mean that the typesafety should be enforced from the database (ORM-level) to the frontend of the application leveraging automatic linting or generated stubs.
- The performance of the two stacks, in particular in relation to their Async I/O capabilities.

A simple To-Do list application is built in both stacks to demonstrate the differences.

## Folder structure

- `backend/`: folder for python code
  - `flask-sqlalchemy1/`: folder for the Flask + SQLAlchemy (<2.0) stack
  - `fastapi-sqlalchemy1/`: folder for the FastAPI + SQLAlchemy (<2.0) stack
  - `fastapi-sqlalchemy2/`: folder for the FastAPI + SQLAlchemy (>=2.0) stack
  - `node/`: folder for the node back-end
    - `src/`: folder for the tRPC code
    - `prisma/`: folder for the Prisma code
- `frontend/`: folder for typescript code
  - `src/`: folder for the React + tRPC code
    - `fastapi-client/`: autogenerated client stubs for the FastAPI API
    - `App.tsx`: Main React application
    - `todos/`: folder for the To-Do list React components
      - `Todos.tsx`: React component for the To-Do list
      - `Stateless.tsx`: Stateless version using `Todos`
      - `Stateful.tsx`: Stateful version with React Query using `Todos` (need to provide a suitable backend)
    - `backend-impl/`: folder for the backend implementations
      - `Flask.tsx`: Flask client using `Stateful.tsx`
      - `FastAPI.tsx`: FastAPI client using `Stateful.tsx`
      - `tRPC.tsx`: tRPC client using `Stateful.tsx`

## Typescript Stack

The Typescript stack is built using the following technologies:

- NodeJS as the back-end runtime
- tRPC as the API framework
- Prisma as the ORM
- React as the frontend framework

This stack is quite popular in the Typescript ecosystem.

It achieves both ORM-level and API-level typesafety.
tRPC is also particularly nice to work with, as it syncs the type between the API layer and the frontend layer (React) with automatic linting.

The webserver (NodeJS) supports Async natively.

## Python Stack

The Python stack is built in different steps to get to the final stack.

### Step 1: Flask + SQLAlchemy (<2.0)

This is the vanilla stack which is commonly used in the python ecosystem.

It doesn't provide any typesafety in the database layer nor in the API layer.

The webserver (Flask) doesn't support Async.

### Step 2: FastAPI + SQLAlchemy (<2.0)

This is a modern stack which is increasingly used in the python ecosystem.

It provides typesafety in the API layer, but not in the database layer.

We can easily leverage the automatic generation of the OpenAPI schema from FastAPI to generate frontend stubs in Typescript to interact with the API with precise types. This is done using the [`openapi-typescript-codegen`](https://www.npmjs.com/package/openapi-typescript-codegen) library.
This gets us a quite nice developer experience, slightly worse than tRPC, but still quite good.

A common suggestion is to use Pydantic models to achieve typesafety in the database layer, but this is not ideal as it doesn't play well with SQLAlchemy.
SQLModel is a library which aims to solve this problem, but it is still in its early stages.

The webserver (FastAPI) supports Async natively. However, SQLAlchemy pre-1.4 doesn't support Async, so we would need to use external packages such as [`databases`](https://github.com/encode/databases).
We prefer to keep it simple at this step and use the synchronous version of SQLAlchemy & FastAPI endpoints.

### Step 3: FastAPI + SQLAlchemy (>=2.0)

This is the final stack which is built in this repository.

Other than the improvements of the previous stack, this stack also provides typesafety in the database layer and the native Async support.

SQLAlchemy 2.0 introduced native support for typed ORM models, which is a huge improvement over the previous versions (which required Mypy plugins that weren't well-supported).

Also, since 1.4, SQLAlchemy supports Async natively, so we can turn our FastAPI endpoints into Async endpoints and reap the benefits of Async I/O.

SQLAlchemy 2.0 also provides a series of additional performance improvements ([2.0 release post](https://www.sqlalchemy.org/blog/2023/01/26/sqlalchemy-2.0.0-released/))

## What's Next?

I expect to see more and more python developers using the FastAPI + SQLAlchemy 2.0 stack in the future, or at least using SQLAlchemy 2.0 in their projects while leveraging libraries like Pydantic to achieve typesafety in the API layer.

There are likely tons of improvements coming to us in the future, such as:

- Future versions of Pydantic will likely integrate much better with SQLAlchemy 2.0 types and [we have already hints of that](https://docs.sqlalchemy.org/en/20/changelog/changelog_20.html#change-2.0.4).
- Pydantic 2.0 rewrite in Rust, which will likely provide a huge performance boost to parsing and validation.
- Let's watch for Tiangolo (FastAPI creator) projects and see what he has in store for us with SQLModel.

## References

### [Presentation slides](https://slides.com/giuzzilla/deck-687a4d/fullscreen)

### Main packages

- [Flask](https://flask.palletsprojects.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Pydantic](https://pydantic-docs.helpmanual.io/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [libuv](https://libuv.org/)

### Additional packages

- [SQLModel](https://sqlmodel.tiangolo.com/)
- [databases](https://github.com/encode/databases)
- [Quart](https://quart.palletsprojects.com/en/latest/) - an async replacement for Flask
- [Django Ninja](https://django-ninja.rest-framework.com/) - extension of Django REST framework similar to FastAPI and used with Django ORM

### Useful links

- [SQLAlchemy 2.0 release post](https://www.sqlalchemy.org/blog/2023/01/26/sqlalchemy-2.0.0-released/)
- [FastAPI and async SQLAlchemy 2.0 with pytest done right
  ](http://praciano.com.br/fastapi-and-async-sqlalchemy-20-with-pytest-done-right.html)
