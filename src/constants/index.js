export const HOSTNAME = 'http://localhost:3000';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
};

export const VALIDATIONS = {
  username: {
    min: 4,
    max: 30,
  },
  email: {
    min: 4,
    max: 30,
  },
  password: {
    min: 4,
    max: 30,
  },
};
