import { LOGOUT, SUCCESS_LOGIN } from './types';

export const user = (
  store = JSON.parse(localStorage.info || '{}'),
  { type, ...payload }
) => {
  switch (type) {
    case SUCCESS_LOGIN:
      return {
        ...payload,
      };
    case LOGOUT:
      return {};
    default:
      return store;
  }
};
