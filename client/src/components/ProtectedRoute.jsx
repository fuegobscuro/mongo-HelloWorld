import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  console.log('ProtectedRoute, isAuthenticated:', isAuthenticated);

  return isAuthenticated ? children : <Navigate to='/admin' />;
};

export default ProtectedRoute;
