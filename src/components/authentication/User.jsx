import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from '../layouts/Header';

const User = () => {
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  return <Navigate to='/login' state={{ from: location.pathname }} replace />;
};
export default User;
