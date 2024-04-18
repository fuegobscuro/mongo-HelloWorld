import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token =
    useSelector((state) => state.token) || localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/admin-login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
