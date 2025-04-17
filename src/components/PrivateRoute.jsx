// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if the token is in localStorage

  return isAuthenticated ? (
    Component // If authenticated, render the component
  ) : (
    <Navigate to="/" /> // If not authenticated, redirect to the login page
  );
};

export default PrivateRoute;
