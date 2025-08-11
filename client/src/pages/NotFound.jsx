import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const NotFound = () => {
  const { user } = React.useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Oops! Page not found.</h2>
      <p className="mb-6 text-gray-700">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to={user?.role==='employer'?'/employer':'/'}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
