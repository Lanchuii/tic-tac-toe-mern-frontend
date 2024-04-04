import './App.scss'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Game from './pages/Game';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 Not Found <Link to='/'>Return to homepage</Link></div>
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
