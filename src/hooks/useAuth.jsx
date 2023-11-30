import React from 'react';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '../utils/constants';
import storage from '../utils/storage';

function useAuth() {
  return {
    accessToken: storage.getStorageItem(ACCESS_TOKEN_KEY),
    refreshToken: storage.getStorageItem(REFRESH_TOKEN_KEY),
    isAccTokExist: storage.isItemExist(ACCESS_TOKEN_KEY),
    isRefTokExist: storage.isItemExist(REFRESH_TOKEN_KEY),
    isTokenExpired: storage.isTokenExpired()
  };
}

export default useAuth;
