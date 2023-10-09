import React from 'react';
import { useSelector } from 'react-redux';

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
    return key === 'accessToken'
      ? {
        date: value ? Number(value.split(',')[0]) : null,
        token: value ? value.split(',')[1] : null
      }
      : value;
  };

  const isTokenExist = (key) => Boolean(getToken(key));

  const isTokenExpired = () => getCurrDate() - getToken('accessToken').date > 20 * 60 * 1000;

  const setCurrTokens = () => {
    const data = {
      accessToken: [getCurrDate(),accessToken.split(' ')[1]].toString(),
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
