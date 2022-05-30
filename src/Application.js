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

const Application = () => {
  const localStorageInfo = localStorage.info || '{}';
  const [authInfo, setAuthInfo] = useState(JSON.parse(localStorageInfo));

  useEffect(() => {
    localStorage.info = JSON.stringify(authInfo);
  }, [authInfo]);

  return (
    <div>
      <Header isLogged={Boolean(authInfo.token)} setAuthInfo={setAuthInfo} />
      <Routes>
        <Route
          element={
            authInfo.token ? <Navigate to={ROUTES.DASHBOARD} /> : <Register />
          }
          path={ROUTES.REGISTER}
        />
        <Route
          element={
            authInfo.token ? (
              <Navigate to={ROUTES.DASHBOARD} />
            ) : (
              <Login setAuthInfo={setAuthInfo} />
            )
          }
          path={ROUTES.LOGIN}
        />
        <Route
          element={
            authInfo.token ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />
          }
          path={ROUTES.DASHBOARD}
        />
        <Route
          element={
            authInfo.token ? <Profile /> : <Navigate to={ROUTES.LOGIN} />
          }
          path={ROUTES.PROFILE}
        />
        <Route
          element={
            authInfo.token ? <Account /> : <Navigate to={ROUTES.LOGIN} />
          }
          path={ROUTES.ACCOUNT}
        />
      </Routes>
    </div>
  );
};

export default Application;
