// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    
    return <Navigate to="/auth" />;
  }

  // If the user is logged in, allow access to the children (the private page)
  return children;
};

export default PrivateRoute;
