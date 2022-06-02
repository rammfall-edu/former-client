import { HOSTNAME } from '../constants';

const request = async (url, method = 'GET', body = null) => {
  const storage = JSON.parse(localStorage.info || '{}');
  const headers = {};

  if (storage.token) {
    headers.authorization = storage.token;
  }

  const result = await fetch(`${HOSTNAME}${url}`, {
    body,
    method,
    headers,
  });
  const data = await result.json();

  if (!result.ok) {
    const error = new Error(data);
    error.description = data;
    throw error;
  }

  return data;
};

export const registerUser = async (body) => {
  return await request('/register', 'POST', body);
};

export const loginUser = async (body) => {
  return await request('/login', 'POST', body);
};

export const getProfile = async () => {
  return await request('/profile');
};

export const createUpdateProfile = async (body, method) => {
  return await request('/profile', method, body);
};

export const updatePassword = async (body) => {
  return await request('/account/password', 'PUT', body);
};
