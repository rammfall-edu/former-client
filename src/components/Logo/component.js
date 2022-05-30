import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';
import './logo.scss';

const Logo = () => (
  <Link className="logo" to={ROUTES.DASHBOARD}>
    [F]ormer
  </Link>
);

export default Logo;
