import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from './AdminContext';

const ProtectedRoute = () => {
  const { login } = useAdmin(); // Get the login state from context

  if (!login) {
    // Redirect to the login page if not logged in
    return <Navigate to="/dash/login" replace />;
  }

  // Render the child routes if logged in
  return <Outlet />;
};

export default ProtectedRoute;