import React from 'react';
import { useSelector } from 'react-redux';

import { ACCESS_TOKEN_KEY } from '../utils/constants';

function useAuth() {
  const {
    accessToken,
    refreshToken
  } = useSelector(state => state.user);

  const getCurrDate = () => {
    const currDate = new Date();
    return currDate.getTime();
  };

  const setToken = (key, value) => localStorage.setItem(key, value);

  const removeToken = (key) => localStorage.removeItem(key);

  const getToken = (key) => {
    const value = localStorage.getItem(key);
    return key === ACCESS_TOKEN_KEY
      ? {
        date: value ? Number(value.split(',')[0]) : null,
        token: value ? value.split(',')[1] : null
      }
      : { token: value };
  };

  const isTokenExist = (key) => Boolean(getToken(key).token);

  const isTokenExpired = () => getCurrDate() - getToken(ACCESS_TOKEN_KEY).date > 20 * 60 * 1000;

  const setCurrTokens = () => {
    const jwt = accessToken.split('Bearer ')[1];
    const data = {
      accessToken: [getCurrDate(),jwt].toString(),
      refreshToken
    };

    Object.keys(data).forEach((key, index) => {
      setToken(key, Object.values(data)[index])
    });
  };

  return {
    getToken,
    removeToken,
    isTokenExist,
    isTokenExpired,
    setCurrTokens
  };
}

export default useAuth;
