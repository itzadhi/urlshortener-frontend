import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Visitor = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Outlet />;
  }

  return <Navigate to='/' replace />;
};

export default Visitor;
