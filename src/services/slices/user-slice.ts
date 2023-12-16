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
  isSucceed: boolean;
  isRecoverySucceed: boolean;
  userRequest: boolean;

  errorMsg: string;
};

const initialState: TUserState = {
  name: '',
  email: '',

  isLogged: false,
  isFailed: false,
  isSucceed: false,
  isRecoverySucceed: false,
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
      isSucceed: true,
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
    getFailed: (state, action: TUserAction) => ({
      ...state,
      isLogged: false,
      isFailed: true,
      isSucceed: false,
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
  getFailed,
  resetUserData
} = userSlice.actions
export default userSlice.reducer;
