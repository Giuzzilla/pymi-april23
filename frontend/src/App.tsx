import './App.css'
import React, { useState } from 'react'
import { FastAPI } from './FastApi'
import { Stateless } from './Stateless'
import { ComponentTRPC } from './trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Flask } from './Flask'

const queryClient = new QueryClient()

function App (): JSX.Element {
  const [selected, setSelected] = useState<string>('stateless')

  const selectedComponent = (): JSX.Element => {
    switch ((selected.length > 0) ? selected : 'stateless') {
      case 'stateless':
        return (
          <section>
            <h1>Stateless Todos</h1>
            <Stateless />
          </section>
        )
      case 'trpc':
        return (
          <section>
            <h1>tRPC Todos</h1>
            <ComponentTRPC />
          </section>
        )
      case 'flask':
        return (
          <section>
            <h1>Flask Todos</h1>
            <Flask />
          </section>
        )
      case 'fastapi':
        return (
          <section>
            <h1>FastAPI Todos</h1>
            <FastAPI />
          </section>
        )

      default:
        return <div>Not found</div>
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <div className="container">
        <select value={selected} onChange={e => { setSelected(e.target.value) }} >
          <option value="stateless">Stateless</option>
          <option value="trpc">trpc</option>
          <option value="flask">Flask</option>
          <option value="fastapi">FastAPI</option>
        </select>
        {selectedComponent()}
      </div>
    </div>
    </QueryClientProvider>
  )
}

export default App
