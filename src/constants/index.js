export const HOSTNAME = 'http://localhost:3000';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  PROFILE: '/profile',
  ACCOUNT: '/account',
  FORM: '/form',
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
  firstName: {
    min: 2,
    max: 15,
  },
  lastName: {
    min: 2,
    max: 15,
  },
  phoneNumber: {
    min: 7,
    max: 20,
  },
  formTitle: {
    min: 8,
    max: 40,
  },
};
