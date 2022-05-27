import { HOSTNAME } from '../constants';

const request = async (url, method = 'GET', body = null) => {
  const result = await fetch(`${HOSTNAME}${url}`, {
    body,
    method,
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
