import { createSlice } from '@reduxjs/toolkit'

import type { TCustomData, TFeedOrder, TFeedData } from '../../types';
import { DONE_STATE, PENDING_STATE } from '../../utils/constants';

type TFeedAction = {
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
  totalData: {},
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

      const handleTime = (value: number): string => `0${value.toString()}`.slice(-2);

      const handleDate = (date: Date): number[] => [date.getDate(), date.getMonth(), date.getFullYear()];

      const formatDate = (value: string): string => {
        const date = new Date(value);
        const currentDate = new Date();
        const dateArr = handleDate(date);
        const currentDateArr = handleDate(currentDate);

        const matchesArr = dateArr.reduce((acc: number[], item, index) => item === currentDateArr[index] ? [...acc, item] : acc, []);
        const formattedDate = `${[date.getDate(), date.getMonth() + 1].map(item => handleTime(item)).join('.')}.${date.getFullYear()}`;
        const formattedTime = [date.getHours(), date.getMinutes()].map(item => handleTime(item)).join(':');

        return matchesArr.length === 3 ? `Сегодня, ${formattedTime}` : `${formattedDate}, ${formattedTime}`;
      };

      const filterOrders = (arr: TFeedOrder[], state: string): string[] => [...arr].filter(({ status }, index) => status === state && index < 10).map(({ number }) => number.toString());

      return {
        ...state,
        totalData: {
          total: total ? total.toString() : '',
          totalToday: totalToday ? totalToday.toString() : ''
        },
        feedOrders: [...orders].map(item => ({...item, updatedAt: formatDate(item.updatedAt)})),
        feedOrdersDone: filterOrders([...orders], DONE_STATE),
        feedOrdersPending: filterOrders([...orders], PENDING_STATE),
        errorMsg: ''
      };
    },
    disconnect: (state, action: TFeedAction) => ({
      ...state,
      feedRequest: false,
      feedSucceed: true,
      feedFailed: false,
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
