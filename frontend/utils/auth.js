import Cookies from 'universal-cookie';
import { AUTH_TOKEN } from '../common/constants';

export const getAuthToken = (req, options) => {
  const cookies = req ? new Cookies(req.headers.cookie || '') : new Cookies();
  return cookies.get(AUTH_TOKEN, options);
};

export const setAuthToken = token => {
  const cookies = new Cookies();
  cookies.set(AUTH_TOKEN, token, { maxAge: 30 * 24 * 60 * 60 }); // 30 days
};

export const removeAuthToken = () => {
  const cookies = new Cookies();
  cookies.remove(AUTH_TOKEN);
};
