import React from 'react';

function useAuth() {
  const getToken = (key) => localStorage.getItem(key);

  const setToken = (key, value) => localStorage.setItem(key, value);

  const removeToken = (key) => localStorage.removeItem(key);

  const isTokenExist = (key) => Boolean(getToken(key));

  const setInitTokens = (accessToken, refreshToken) => {
    const data = {
      accessToken: accessToken.split(' ')[1],
      refreshToken
    };
    Object.keys(data).forEach((key, index) => {
      setToken(key, Object.values(data)[index])
    });
  };

  return {
    getToken,
    setToken,
    removeToken,
    isTokenExist,
    setInitTokens
  };
}

export default useAuth;
