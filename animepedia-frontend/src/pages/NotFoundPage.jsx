import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;