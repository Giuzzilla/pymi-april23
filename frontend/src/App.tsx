import './App.css'
import React from 'react'
import { FastApi } from './FastApi'
import { Stateless } from './Stateless'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App (): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <section>
        <h1>Stateless Todos (no persistence)</h1>
        <Stateless />
      </section>
      <section>
        <h1>FastApi Todos</h1>
        <FastApi />
      </section>
    </div>
    </QueryClientProvider>
  )
}

export default App
