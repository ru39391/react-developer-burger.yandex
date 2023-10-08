import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  name: '',
  email: '',
  user: {},

  isFailed: false,
  userRequest: false,

  accessToken: '',
  refreshToken: '',

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
      user: {...action.payload.data},
      userRequest: false,
      isFailed: false
    }),
    getFailed: (state, action) => ({
      ...state,
      userRequest: false,
      isFailed: true,
      errorMsg: action.payload.errorMsg
    }),

    //setUserData(state, action) {    },
  }
});

export const {
  getUserRequest,
  getUserSuccess,
  getFailed
} = userSlice.actions
export default userSlice.reducer;
