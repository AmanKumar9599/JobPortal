import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Unauthorized = () => {
    const {user} = useContext(AppContext);
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="mb-6">You don’t have permission to access this page.</p>
      <Link to={user?.role==='employer'?'/employer':'/'} className="text-blue-600 underline">Go back to Home</Link>
    </div>
  );
};

export default Unauthorized;
