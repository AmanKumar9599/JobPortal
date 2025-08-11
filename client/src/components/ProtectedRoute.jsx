import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from './Loading';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user,loadingUser } = useContext(AppContext);

  if(loadingUser){
    return <Loading/>;
  }

  if (!user) {
    // Not logged in
    if (allowedRoles.includes('guest')) {
      return <Outlet />;
    }
    return <Navigate to="/login" replace />;
  }



  if (!allowedRoles.includes(user.role)) {
    // Role not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
