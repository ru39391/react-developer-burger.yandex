import { createSlice } from '@reduxjs/toolkit'

import type { TUserData, TUser } from '../../types';

type TUserAction = {
  payload: {
    data?: TUser | TUserData
    name?: string;
    email?: string;
    isLogged?: boolean;
    errorMsg?: string;
  };
};

export type TUserState = {
  name: string;
  email: string;

  isLogged: boolean;
  isFailed: boolean;
  isRegistered: boolean;
  isRecoverySucceed: boolean;
  isResetSucceed: boolean;
  userRequest: boolean;

  errorMsg: string;
};

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state, action: TUserAction) => ({
      ...state,
      userRequest: true
    }),
    getUserSuccess: (state, action: TUserAction) => ({
      ...state,
      ...action.payload.data,
      isFailed: false,
      isRegistered: true,
      userRequest: false,
      errorMsg: ''
    }),
    getRecoverySuccess: (state, action: TUserAction) => ({
      ...state,
      isFailed: false,
      isRecoverySucceed: true,
      userRequest: false,
      errorMsg: ''
    }),
    getResetSuccess: (state, action: TUserAction) => ({
      ...state,
      isFailed: false,
      isResetSucceed: true,
      userRequest: false,
      errorMsg: ''
    }),
    getFailed: (state, action: TUserAction) => ({
      ...state,
      isLogged: false,
      isFailed: true,
      isRegistered: false,
      isRecoverySucceed: false,
      userRequest: false,
      errorMsg: action.payload.errorMsg || ''
    }),
    resetUserData: () => ({ ...initialState }),
  }
});

export const {
  getUserRequest,
  getUserSuccess,
  getRecoverySuccess,
  getResetSuccess,
  getFailed,
  resetUserData
} = userSlice.actions
export default userSlice.reducer;
