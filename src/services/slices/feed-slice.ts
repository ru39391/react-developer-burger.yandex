import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData, TFeedOrder, TFeedData } from '../../types';
import formatDate from '../../utils/dateFormatter';
import { DONE_STATE, PENDING_STATE } from '../../utils/constants';

export type TFeedAction = {
  payload: {
    url?: string;
    data?: TFeedData;
    errorMsg?: string;
  };
};

export type TFeedState = {
  feedRequest: boolean;
  feedSucceed: boolean;
  feedFailed: boolean;
  totalData: TCustomData<string>;
  feedOrders: TFeedOrder[];
  feedOrdersDone: string[];
  feedOrdersPending: string[];
  errorMsg: string;
};

const initialState: TFeedState = {
  feedRequest: false,
  feedSucceed: false,
  feedFailed: false,
  totalData: {
    total: '0',
    totalToday: '0'
  },
  feedOrders: [],
  feedOrdersDone: [],
  feedOrdersPending: [],
  errorMsg: ''
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    getFeedRequest: (state, action: TFeedAction) => ({
      ...state,
      feedRequest: true
    }),
    getFeedSuccess: (state, action: TFeedAction) => ({
      ...state,
      feedRequest: false,
      feedSucceed: true,
      feedFailed: false,
      errorMsg: ''
    }),
    getFeedFailed: (state, action: TFeedAction) => ({
      ...state,
      feedRequest: false,
      feedSucceed: false,
      feedFailed: true,
      errorMsg: action.payload.errorMsg || ''
    }),
    fetchFeedData(state, action: TFeedAction) {
      const {
        orders,
        total,
        totalToday
      } = action.payload.data as TFeedData;

      const filterOrders = (arr: TFeedOrder[], state: string): string[] => [...arr].filter(({ status }, index) => status === state && index < 10).map(({ number }) => number.toString());

      return {
        ...state,
        totalData: total && totalToday
          ? {
              total: total.toString(),
              totalToday: totalToday.toString()
            }
          : {...initialState.totalData},
        feedOrders: [...orders].map(item => ({...item, updatedAt: formatDate(item.updatedAt)})),
        feedOrdersDone: filterOrders([...orders], DONE_STATE),
        feedOrdersPending: filterOrders([...orders], PENDING_STATE),
        errorMsg: ''
      };
    },
    disconnect: (state, action: TFeedAction) => ({
      ...initialState,
      errorMsg: action.payload.errorMsg || ''
    }),
  }
});

export const {
  reducer: feedReducer,
  actions: feedActions
} = feedSlice;
export const {
  getFeedRequest,
  getFeedSuccess,
  getFeedFailed,
  fetchFeedData,
  disconnect
} = feedSlice.actions;
