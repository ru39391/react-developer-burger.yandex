import {
  LOGIN_URL,
  AUTH_ALIAS,
  RESET_PASSWORD_ALIAS,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
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

const api = new userApi(AUTH_ALIAS);
const passwordApi = new userApi(RESET_PASSWORD_ALIAS);

const fetchData = (data, alias = '') => async dispatch => {
  dispatch(getUserRequest());
  try {
    const res = await api.fetchData(data, alias);
    if (res && res.success) {
      const { user, accessToken, refreshToken } = res;
      const data = alias === LOGIN_URL
        ? { ...user, isLogged: true }
        : { ...user };

      dispatch(getUserSuccess({ data }));
      if(alias === LOGIN_URL) storage.setCurrTokens({ accessToken, refreshToken });
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
    }
  } catch (err) {
    dispatch(getFailed({ errorMsg: err }));
  }
};

const getAccessToken = (data, alias = '') => async dispatch => {
  dispatch(getUserRequest());
  try {
    const res = await api.getAccessToken(data, alias);
    if (res && res.success) {
      const { user, accessToken, refreshToken } = res;
      accessToken
        ? storage.setCurrTokens({ accessToken, refreshToken })
        : dispatch(getUserSuccess({ data: { ...user } }));
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
    }
  } catch (err) {
    dispatch(getFailed({ errorMsg: err }));
  }
};

const updateData = (data, alias = '') => async dispatch => {
  dispatch(getUserRequest());
  try {
    const { token } = storage.getToken(ACCESS_TOKEN_KEY);
    const res = await api.fetchData({ ...data, jwt: token }, alias);
    if (res && res.success) {
      const { user } = res;
      dispatch(getUserSuccess({ data: { ...user } }));
    } else {
      dispatch(getFailed({ errorMsg: UPDATE_ERROR_MSG }));
    }
  } catch (err) {
    dispatch(getFailed({ errorMsg: err }));
  }
};

const recoverPassword = (data, alias = '') => async dispatch => {
  dispatch(getUserRequest());
  try {
    const res = await passwordApi.recoverPassword(data, alias);
    if (res && res.success) {
      dispatch(getRecoverySuccess());
    } else {
      dispatch(getFailed({ errorMsg: UPDATE_ERROR_MSG }));
    }
  } catch (err) {
    dispatch(getFailed({ errorMsg: err }));
  }
};

const signOut = (data, alias = '') => async dispatch => {
  dispatch(getUserRequest());
  try {
    const res = await api.getAccessToken(data, alias);
    if (res && res.success) {
      storage.clearStorage();
      dispatch(resetUserData());
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
    }
  } catch (err) {
    dispatch(getFailed({ errorMsg: err }));
  }
};

export {
  signOut,
  fetchData,
  updateData,
  recoverPassword,
  getAccessToken
};
