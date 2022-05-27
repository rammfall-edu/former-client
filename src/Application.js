import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Header from './components/Header';
import './application.scss';
import Login from './pages/Login';
import { ROUTES } from './constants';

const Application = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route element={<Register />} path={ROUTES.REGISTER} />
        <Route element={<Login />} path={ROUTES.LOGIN} />
      </Routes>
    </div>
  );
};

export default Application;
