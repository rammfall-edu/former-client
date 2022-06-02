import { LOGOUT, SUCCESS_LOGIN } from './types';

export const successLogin = ({ username, email, token }) => {
  localStorage.info = JSON.stringify({ username, email, token });
  return {
    type: SUCCESS_LOGIN,
    username,
    email,
    token,
  };
};

export const logoutUser = () => {
  delete localStorage.info;

  return {
    type: LOGOUT,
  };
};
