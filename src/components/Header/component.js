import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';
import Button from '../Button';
import { ROUTES } from '../../constants';
import Logo from '../Logo';

const Header = ({ isLogged, setAuthInfo }) => {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <div className="buttons">
          {isLogged ? (
            <>
              <Button kind="link" href={ROUTES.PROFILE}>
                Profile
              </Button>
              <Button kind="link" href={ROUTES.ACCOUNT}>
                Account
              </Button>
              <Button
                onClick={() => {
                  setAuthInfo({});
                }}
                href={ROUTES.PROFILE}
              >
                Exit
              </Button>
            </>
          ) : (
            <>
              <Button kind="link" href={ROUTES.REGISTER}>
                Register
              </Button>
              <Button type="outline" kind="link" href={ROUTES.LOGIN}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

export default Header;
