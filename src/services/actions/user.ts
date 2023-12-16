import { Dispatch } from 'redux';
import {
  LOGIN_URL,
  AUTH_ALIAS,
  RESET_PASSWORD_ALIAS,
  ACCESS_TOKEN_KEY,
  IS_LOGGED_KEY,
  IS_PASSWORD_REQ_SENT_KEY,
  UPDATE_ERROR_MSG,
  RESPONSE_ERROR_MSG
} from '../../utils/constants';
import {
  getUserRequest,
  getUserSuccess,
  getRecoverySuccess,
  getFailed,
  resetUserData
} from '../slices/user-slice';
import userApi from '../../utils/userApi';
import storage from '../../utils/storage';
import type { TAppThunk } from '../../services/store';
import type {
  TUser,
  TUserData,
  TCustomData,
  TToken
} from '../../types';

const api: userApi = new userApi(AUTH_ALIAS);
const passwordApi: userApi = new userApi(RESET_PASSWORD_ALIAS);

const fetchData = (data: { values: TCustomData<string> }, alias: string = ''): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await api.fetchData(data, alias);
    if (res && res.success) {
      const { user, accessToken, refreshToken } = res;
      const data: TUser | TUserData = alias === LOGIN_URL
        ? { ...user, isLogged: true }
        : { ...user };

      dispatch(getUserSuccess({ data }));
      if(alias === LOGIN_URL && (accessToken && refreshToken)) storage.setCurrTokens({ accessToken, refreshToken });
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
    }
  } catch (err: unknown) {
    dispatch(getFailed({ errorMsg: err as string }));
  }
};

const getAccessToken = (data: TCustomData<string>, alias: string = ''): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await api.getAccessToken(data, alias);
    if (res && res.success) {
      const { user, accessToken, refreshToken } = res;
      accessToken && refreshToken
        ? storage.setCurrTokens({ accessToken, refreshToken })
        : dispatch(getUserSuccess({ data: { ...user } }));
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
    }
  } catch (err: unknown) {
    dispatch(getFailed({ errorMsg: err as string }));
  }
};

const updateData = (data: { values: TCustomData<string> }, alias: string = ''): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getUserRequest({}));
  try {
    const accessToken: TToken = typeof storage.getStorageItem(ACCESS_TOKEN_KEY) !== 'string' && Boolean(storage.getStorageItem(ACCESS_TOKEN_KEY))
      ? storage.getStorageItem(ACCESS_TOKEN_KEY)
      : undefined;
    const token: string | undefined = typeof accessToken === 'object' && accessToken !== undefined ? accessToken.token : undefined;
    const res = await api.fetchData({ ...data, jwt: token }, alias);
    if (res && res.success) {
      const { user } = res;
      dispatch(getUserSuccess({ data: { ...user } }));
    } else {
      dispatch(getFailed({ errorMsg: UPDATE_ERROR_MSG }));
    }
  } catch (err: unknown) {
    dispatch(getFailed({ errorMsg: err as string }));
  }
};

const recoverPassword = (data: TCustomData<string>, alias: string = ''): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await passwordApi.recoverPassword(data, alias);
    if (res && res.success) {
      dispatch(getRecoverySuccess({}));
    } else {
      dispatch(getFailed({ errorMsg: UPDATE_ERROR_MSG }));
    }
  } catch (err: unknown) {
    dispatch(getFailed({ errorMsg: err as string }));
  }
};

const signOut = (data: TCustomData<string>, alias: string = ''): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await api.getAccessToken(data, alias);
    if (res && res.success) {
      storage.clearStorage();
      [IS_LOGGED_KEY, IS_PASSWORD_REQ_SENT_KEY].forEach(item => storage.removeStorageItem(item));
      dispatch(resetUserData());
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
    }
  } catch (err: unknown) {
    dispatch(getFailed({ errorMsg: err as string }));
  }
};

export {
  signOut,
  fetchData,
  updateData,
  recoverPassword,
  getAccessToken
};
