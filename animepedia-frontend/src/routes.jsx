import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnimePage from './pages/AnimePage';
import CharactersPage from './pages/CharacterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/anime',
    element: <AnimePage />,
  },
  {
    path: '/characters',
    element: <CharactersPage />,
  },
  // Add more routes as needed (e.g., anime detail, character detail)
  {
    path: '*',
    element: (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
          <a href="/" className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
            Go Home
          </a>
        </div>
      </div>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;