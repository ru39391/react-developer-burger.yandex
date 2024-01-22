import {
  LOGIN_URL,
  RESET_URL,
  IS_LOGGED_KEY,
  IS_PASSWORD_REQ_SENT_KEY,
  UPDATE_ERROR_MSG,
  RESPONSE_ERROR_MSG
} from '../../utils/constants';
import {
  getUserRequest,
  getUserSuccess,
  getRecoverySuccess,
  getResetSuccess,
  getFailed,
  resetUserData
} from '../slices/user-slice';
import storage from '../../utils/storage';
import { userApi, passwordApi } from '../../utils/userApi';
import type { TAppThunk, TAppDispatch } from '../../services/store';
import type {
  TUser,
  TUserData,
  TCustomData
} from '../../types';

const handleUser = (data: { values: TCustomData<string> }, alias: string = ''): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await userApi.handleUser(data, alias);
    if (res && res.success) {
      const { user, accessToken, refreshToken } = res;
      const data: TUser | TUserData = alias === LOGIN_URL
        ? { ...user, isLogged: true }
        : { ...user };

      dispatch(getUserSuccess({ data }));
      if(alias === LOGIN_URL && (accessToken && refreshToken)) {
        storage.setCurrTokens({ accessToken, refreshToken });
      }
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
    }
  } catch (err: unknown) {
    dispatch(getFailed({ errorMsg: err as string }));
  }
};

const getAccessToken = (data: TCustomData<string>, alias: string = ''): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await userApi.getAccessToken(data, alias);
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

const updateData = (data: { values: TCustomData<string> }, jwt: string, alias: string = ''): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await userApi.handleUser({ ...data, jwt }, alias);
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

const recoverPassword = (data: TCustomData<string>, alias: string = ''): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await passwordApi.recoverPassword(data, alias);
    if (res && res.success) {
      alias === RESET_URL ? dispatch(getResetSuccess({})) : dispatch(getRecoverySuccess({}));
    } else {
      dispatch(getFailed({ errorMsg: UPDATE_ERROR_MSG }));
    }
  } catch (err: unknown) {
    dispatch(getFailed({ errorMsg: err as string }));
  }
};

const signOut = (data: TCustomData<string>, alias: string = ''): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getUserRequest({}));
  try {
    const res = await userApi.getAccessToken(data, alias);
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
  handleUser,
  updateData,
  recoverPassword,
  getAccessToken
};
