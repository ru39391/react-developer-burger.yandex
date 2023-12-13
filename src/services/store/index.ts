import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from '../slices';

const store = configureStore({
  reducer,
  middleware: [thunk],
})

export default store;

export type AppDispatch = typeof store.dispatch;
