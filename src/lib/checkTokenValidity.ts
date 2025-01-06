import { isTokenExpired } from './isTokenExpired';

export const checkTokenValidity = () => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    // if token is expired, remove it from local storage
    localStorage.removeItem('token');
    return false;
  }

  return true;
};
