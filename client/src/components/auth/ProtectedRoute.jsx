import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
  const token = useSelector((state) => state.token);
  if (!token) {
    return <Navigate to='/admin-login' />;
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return <Navigate to='/admin-login' />;
    }
  } catch (error) {
    return <Navigate to='/admin-login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
