import storage from '../utils/storage';
import {
  IS_LOGGED_KEY,
  IS_PASSWORD_REQ_SENT_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '../utils/constants';

import type { TToken } from '../types';

interface IAuthHook {
  accessToken: TToken;
  refreshToken: TToken;
  isAccTokExist: boolean;
  isRefTokExist: boolean;
  isTokenExpired: boolean;
  isLogged: boolean;
  isPasswordReqSent: boolean;
}

const useAuth = (): IAuthHook => {
  return {
    accessToken: storage.getStorageItem(ACCESS_TOKEN_KEY),
    refreshToken: storage.getStorageItem(REFRESH_TOKEN_KEY),
    isAccTokExist: storage.isItemExist(ACCESS_TOKEN_KEY),
    isRefTokExist: storage.isItemExist(REFRESH_TOKEN_KEY),
    isTokenExpired: storage.isTokenExpired(),
    isLogged: Boolean(storage.isItemExist(IS_LOGGED_KEY, false) && storage.getStorageItem(IS_LOGGED_KEY, false)),
    isPasswordReqSent: Boolean(storage.isItemExist(IS_PASSWORD_REQ_SENT_KEY, false) && storage.getStorageItem(IS_PASSWORD_REQ_SENT_KEY, false))
  };
}

export default useAuth;
