import './App.css'
import React, { useState } from 'react'
import { FastApi } from './FastApi'
import { Stateless } from './Stateless'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
      case 'fastapi':
        return (
          <section>
            <h1>FastAPI Todos</h1>
            <FastApi />
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
          <option value="fastapi">FastAPI</option>
        </select>
        {selectedComponent()}
      </div>
    </div>
    </QueryClientProvider>
  )
}

export default App
