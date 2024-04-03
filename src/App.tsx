import './App.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Game from './pages/Game';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/game',
    element: <Game />
  }
]);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
