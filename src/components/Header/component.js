import React from 'react';

import './header.scss';
import Button from '../Button';
import { ROUTES } from '../../constants';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="" className="logo">
          Logo
        </a>
        <div className="buttons">
          <Button kind="link" href={ROUTES.REGISTER}>
            Register
          </Button>
          <Button type="outline" kind="link" href={ROUTES.LOGIN}>
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
