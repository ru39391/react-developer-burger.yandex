import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  name: '',
  email: '',

  isLogged: false,
  isFailed: false,
  isSucceed: false,
  userRequest: false,

  errorMsg: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state, action) => ({
      ...state,
      userRequest: true
    }),
    getUserSuccess: (state, action) => ({
      ...state,
      ...action.payload.data,
      isFailed: false,
      isSucceed: true,
      userRequest: false,
      errorMsg: ''
    }),
    getFailed: (state, action) => ({
      ...state,
      isLogged: false,
      isFailed: true,
      isSucceed: false,
      userRequest: false,
      errorMsg: action.payload.errorMsg
    }),
    resetUserData: () => ({ ...initialState }),
  }
});

export const {
  getUserRequest,
  getUserSuccess,
  getFailed,
  resetUserData
} = userSlice.actions
export default userSlice.reducer;
