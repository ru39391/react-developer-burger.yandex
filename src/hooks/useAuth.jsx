import React from 'react';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '../utils/constants';
import storage from '../utils/storage';

function useAuth() {
  return {
    accessToken: storage.getToken(ACCESS_TOKEN_KEY),
    refreshToken: storage.getToken(REFRESH_TOKEN_KEY),
    isAccTokExist: storage.isTokenExist(ACCESS_TOKEN_KEY),
    isRefTokExist: storage.isTokenExist(REFRESH_TOKEN_KEY),
    isTokenExpired: storage.isTokenExpired()
  };
}

export default useAuth;
