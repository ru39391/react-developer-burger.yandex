import {
  userReducer,
  getUserRequest,
  getUserSuccess,
  getRecoverySuccess,
  getResetSuccess,
  getFailed,
  resetUserData
} from '../user-slice';

import type { TUserData } from '../../../types';
import type { TUserState, TUserAction } from '../user-slice';

import {
  TEST_USER_NAME,
  TEST_USER_EMAIL,
  RESPONSE_ERROR_MSG
} from '../../../utils/constants';

const initialState: TUserState = {
  name: '',
  email: '',
  isLogged: false,
  isFailed: false,
  isRegistered: false,
  isRecoverySucceed: false,
  isResetSucceed: false,
  userRequest: false,
  errorMsg: '',
};

describe('user reducer', () => {
  test('Should return the initial state', () => {
    const action: { type: string | undefined } & TUserAction = {
      type: undefined,
      payload: {}
    };

    expect(userReducer(undefined, action)).toEqual(initialState);
  });

  it('Should handle getUserRequest', () => {
    const expectedState: TUserState = {
      ...initialState,
      userRequest: true
    };
    const res: TUserState = userReducer(initialState, getUserRequest({}));

    expect(res).toEqual(expectedState);
    expect(res.userRequest).toEqual(expectedState.userRequest);
  });

  it('Should handle getUserSuccess', () => {
    const data: TUserData = {
      name: TEST_USER_NAME,
      email: TEST_USER_EMAIL
    };
    const expectedState: TUserState = {
      ...initialState,
      ...data,
      isRegistered: true
    };
    const res: TUserState = userReducer(initialState, getUserSuccess({ data }));

    expect(res).toEqual(expectedState);
    expect(res.name).toEqual(expectedState.name);
    expect(res.email).toEqual(expectedState.email);
  });

  it('Should handle getRecoverySuccess', () => {
    const expectedState: TUserState = {
      ...initialState,
      isRecoverySucceed: true
    };
    const res: TUserState = userReducer(initialState, getRecoverySuccess({}));

    expect(res).toEqual(expectedState);
    expect(res.isRecoverySucceed).toEqual(expectedState.isRecoverySucceed);
  });

  it('Should handle getResetSuccess', () => {
    const expectedState: TUserState = {
      ...initialState,
      isResetSucceed: true
    };
    const res: TUserState = userReducer(initialState, getResetSuccess({}));

    expect(res).toEqual(expectedState);
    expect(res.isResetSucceed).toEqual(expectedState.isResetSucceed);
  });

  it('Should handle getFailed', () => {
    const expectedState: TUserState = {
      ...initialState,
      isFailed: true,
      errorMsg: RESPONSE_ERROR_MSG
    };
    const res: TUserState = userReducer(initialState, getFailed({ errorMsg: RESPONSE_ERROR_MSG }));

    expect(res).toEqual(expectedState);
    expect(res.errorMsg).toEqual(expectedState.errorMsg);
  });

  it('Should handle resetUserData', () => {
    const res: TUserState = userReducer(initialState, resetUserData());

    expect(res).toEqual(initialState);
  });
});
