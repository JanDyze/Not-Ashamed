import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface dark:bg-surface-dark flex flex-col">
        <nav className="bg-primary text-primary-foreground p-4 shadow-md">
          <ul className="flex gap-6 justify-center">
            <li>
              <Link
                to="/"
                className="hover:bg-primary/80 px-3 py-2 rounded-md transition-colors"
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;