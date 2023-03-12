import './App.css';
import { Stateless } from './Stateless';

function App() {
  return (
    <div className="App">
      <section>
        <h1>Stateless Todos (no persistence)</h1>
        <Stateless />
      </section>
    </div>
  );
}

export default App;
