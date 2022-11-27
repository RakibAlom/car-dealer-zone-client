import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin/useAdmin';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.uid);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return ''
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;