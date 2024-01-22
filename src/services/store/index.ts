import thunk, { ThunkDispatch } from 'redux-thunk';
import {
  configureStore,
  ThunkAction,
  AnyAction,
  Action
} from '@reduxjs/toolkit';
import reducer from '../slices';
import { TAppActions } from '../slices';
import { feedActions } from '../slices/feed-slice';
import feedMiddleware from '../middleware/feedMiddleware';

const store = configureStore({
  reducer,
  middleware: [thunk, feedMiddleware(feedActions)],
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export type TThunkDispatch = ThunkDispatch<TRootState, void, AnyAction>;
export type TAppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  TRootState,
  unknown,
  Action<TAppActions>
>;

export default store;
