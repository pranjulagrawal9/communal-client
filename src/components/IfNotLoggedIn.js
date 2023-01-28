import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, getItem } from '../utils/localStorageManager'

function IfNotLoggedIn() {
    const tokenInLS= getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

  return (
    tokenInLS ? <Navigate to="/" /> : <Outlet />
  );
}

export default IfNotLoggedIn