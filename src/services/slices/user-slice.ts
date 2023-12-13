import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

import { TUserData } from '../../types/data';

type TUserAction = {
  payload: {
    data?: TUserData;
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

  errorMsg?: string;
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
    getUserRequest: (state: TUserState, action: TUserAction) => ({
      ...state,
      userRequest: true
    }),
    getUserSuccess: (state: TUserState, action: TUserAction) => ({
      ...state,
      ...action.payload.data,
      isFailed: false,
      isSucceed: true,
      userRequest: false,
      errorMsg: ''
    }),
    getRecoverySuccess: (state: TUserState, action: TUserAction) => ({
      ...state,
      isFailed: false,
      isRecoverySucceed: true,
      userRequest: false,
      errorMsg: ''
    }),
    getFailed: (state: TUserState, action: TUserAction) => ({
      ...state,
      isLogged: false,
      isFailed: true,
      isSucceed: false,
      isRecoverySucceed: false,
      userRequest: false,
      errorMsg: action.payload.errorMsg
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
