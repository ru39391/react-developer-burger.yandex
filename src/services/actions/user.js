import {
  AUTH_ALIAS,
  RESPONSE_ERROR_MSG
} from '../../utils/constants';
import {
  getUserRequest,
  getUserSuccess,
  getFailed,
  resetUserData
} from '../slices/user-slice';
import userApi from '../../utils/userApi';

const api = new userApi(AUTH_ALIAS);

const fetchData = (data, alias = '') => async dispatch => {
  dispatch(getUserRequest());
  try {
    const res = await api.fetchData(data, alias);
    if (res && res.success) {
      const { user, accessToken, refreshToken } = res;
      dispatch(getUserSuccess({ data: { ...user, accessToken, refreshToken } }));
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
      const data = accessToken ? { accessToken, refreshToken } : { ...user };
      dispatch(getUserSuccess({ data }));
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }));
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
  getAccessToken
};
