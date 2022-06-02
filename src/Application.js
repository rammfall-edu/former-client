import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Header from './components/Header';
import './application.scss';
import Login from './pages/Login';
import { ROUTES } from './constants';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Account from './pages/Account';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from './store/user/selectors';

const Application = () => {
  const isLogged = useSelector(isLoggedSelector);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          element={isLogged ? <Navigate to={ROUTES.DASHBOARD} /> : <Register />}
          path={ROUTES.REGISTER}
        />
        <Route
          element={isLogged ? <Navigate to={ROUTES.DASHBOARD} /> : <Login />}
          path={ROUTES.LOGIN}
        />
        <Route
          element={isLogged ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />}
          path={ROUTES.DASHBOARD}
        />
        <Route
          element={isLogged ? <Profile /> : <Navigate to={ROUTES.LOGIN} />}
          path={ROUTES.PROFILE}
        />
        <Route
          element={isLogged ? <Account /> : <Navigate to={ROUTES.LOGIN} />}
          path={ROUTES.ACCOUNT}
        />
      </Routes>
    </div>
  );
};

export default Application;
