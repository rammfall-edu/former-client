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
import Modal from './components/Modal';
import FormDetails from './pages/FormDetails';

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
              <Login setAuthInfo={setAuthInfo} authInfo={authInfo} />
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
            authInfo.token ? (
              <Account email={authInfo.email} />
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
          path={ROUTES.ACCOUNT}
        />
        <Route
          element={
            authInfo.token ? <FormDetails /> : <Navigate to={ROUTES.LOGIN} />
          }
          path={`${ROUTES.FORM}/:id`}
        />
      </Routes>
    </div>
  );
};

export default Application;
