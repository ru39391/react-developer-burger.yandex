import {
  AUTH_ALIAS,
  RESPONSE_ERROR_MSG
} from '../../utils/constants';
import {
  getUserRequest,
  getUserSuccess,
  getFailed
} from '../slices/user-slice';
import userApi from '../../utils/userApi';

const api = new userApi(AUTH_ALIAS);

const fetchData = (data, alias = '') => async dispatch => {
  dispatch(getUserRequest())
  try {
    const res = await api.fetchData(data, alias);
    if (res && res.success) {
      const { user, accessToken, refreshToken } = res;
      dispatch(getUserSuccess({ data: { ...user, accessToken, refreshToken } }));
    } else {
      dispatch(getFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err) {
    dispatch(getFailed({ errorMsg: err }))
  }
};

export {
  fetchData
};
