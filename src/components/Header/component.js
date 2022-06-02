import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './header.scss';
import Button from '../Button';
import { ROUTES } from '../../constants';
import Logo from '../Logo';
import { isLoggedSelector, usernameSelector } from '../../store/user/selectors';
import { logoutUser } from '../../store/user/actions';
import { Link } from 'react-router-dom';

const Header = () => {
  const isLogged = useSelector(isLoggedSelector);
  const username = useSelector(usernameSelector);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <div className="buttons">
          {isLogged ? (
            <>
              <div className="header__account">
                {username}
                <ul className="header__list">
                  <li>
                    <Link className="header__link" to={ROUTES.PROFILE}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="header__link" to={ROUTES.ACCOUNT}>
                      Account
                    </Link>
                  </li>
                  <li>
                    <button
                      className="header__link"
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Exit
                    </button>
                  </li>
                </ul>
              </div>
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

export default Header;
