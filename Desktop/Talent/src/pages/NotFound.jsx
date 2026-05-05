import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-600 mt-2">Page not found.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
        Go Home
      </Link>
    </div>
  );
}
