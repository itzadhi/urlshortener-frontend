import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    return <Outlet />;
  }

  return <Navigate to='/login' state={{ from: location.pathname }} replace />;
};
export default User;
