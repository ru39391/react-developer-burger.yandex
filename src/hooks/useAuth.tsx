import storage from '../utils/storage';
import {
  IS_LOGGED_KEY,
  IS_PASSWORD_REQ_SENT_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '../utils/constants';

interface IAuthHook {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isAccTokExist: boolean;
  isRefTokExist: boolean;
  isTokenExpired: boolean;
  isLogged: boolean;
  isPasswordReqSent: boolean;
}

const useAuth = (): IAuthHook => {
  const accessToken = storage.getStorageItem(ACCESS_TOKEN_KEY);
  const refreshToken = storage.getStorageItem(REFRESH_TOKEN_KEY);

  return {
    accessToken: typeof accessToken === 'object' && accessToken !== undefined ? accessToken.token : undefined,
    refreshToken: typeof refreshToken === 'object' && refreshToken !== undefined ? refreshToken.token : undefined,
    isAccTokExist: storage.isItemExist(ACCESS_TOKEN_KEY),
    isRefTokExist: storage.isItemExist(REFRESH_TOKEN_KEY),
    isTokenExpired: storage.isTokenExpired(),
    isLogged: Boolean(storage.isItemExist(IS_LOGGED_KEY, false) && storage.getStorageItem(IS_LOGGED_KEY, false)),
    isPasswordReqSent: Boolean(storage.isItemExist(IS_PASSWORD_REQ_SENT_KEY, false) && storage.getStorageItem(IS_PASSWORD_REQ_SENT_KEY, false))
  };
}

export default useAuth;
