import thunk from 'redux-thunk';
import {
  configureStore,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import reducer from '../slices';

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export type TAppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  TRootState,
  unknown,
  Action<string>
>;

export default store;
