import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  // Check if token exists (this means the user is logged in)
  const token = localStorage.getItem('authToken');
  
  // If token exists, allow access to the route, otherwise redirect to login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
