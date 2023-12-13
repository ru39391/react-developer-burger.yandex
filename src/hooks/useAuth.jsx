import React, { FC } from 'react';

import storage from '../utils/storage';
import {
  IS_LOGGED_KEY,
  IS_PASSWORD_REQ_SENT_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '../utils/constants';

function useAuth() {
  return {
    accessToken: storage.getStorageItem(ACCESS_TOKEN_KEY),
    refreshToken: storage.getStorageItem(REFRESH_TOKEN_KEY),
    isAccTokExist: storage.isItemExist(ACCESS_TOKEN_KEY),
    isRefTokExist: storage.isItemExist(REFRESH_TOKEN_KEY),
    isTokenExpired: storage.isTokenExpired(),
    isLogged: storage.isItemExist(IS_LOGGED_KEY, false) && storage.getStorageItem(IS_LOGGED_KEY, false),
    isPasswordReqSent: storage.isItemExist(IS_PASSWORD_REQ_SENT_KEY, false) && storage.getStorageItem(IS_PASSWORD_REQ_SENT_KEY, false)
  };
}

export default useAuth;
