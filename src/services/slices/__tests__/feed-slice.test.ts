import {
  feedReducer,
  getFeedRequest,
  getFeedSuccess,
  getFeedFailed,
  fetchFeedData,
  disconnect,
  initialState
} from '../feed-slice';

import type { TFeedData, TFeedOrder } from '../../../types';
import type { TFeedState, TFeedAction } from '../feed-slice';

import formatDate from '../../../utils/dateFormatter';
import { FEED_ERROR_MSG } from '../../../utils/constants';

const feedOrderData: TFeedOrder = {
  _id: '65ad739e87899c001b82a9a1',
  ingredients: [
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa0945',
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Антарианский флюоресцентный space бургер',
  createdAt: '2024-01-21T19:42:22.582Z',
  updatedAt: '2024-01-21T19:42:23.064Z',
  number: 32368
};

describe('feed reducer', () => {
  test('Should return the initial state', () => {
    const action: { type: string | undefined } & TFeedAction = {
      type: undefined,
      payload: {}
    };

    expect(feedReducer(undefined, action)).toEqual(initialState);
  });

  it('Should handle getFeedRequest', () => {
    const expectedState: TFeedState = {
      ...initialState,
      feedRequest: true
    };
    const res: TFeedState = feedReducer(initialState, getFeedRequest({}));

    expect(res).toEqual(expectedState);
    expect(res.feedRequest).toEqual(expectedState.feedRequest);
  });

  it('Should handle getFeedSuccess', () => {
    const expectedState: TFeedState = {
      ...initialState,
      feedSucceed: true
    };
    const res: TFeedState = feedReducer(initialState, getFeedSuccess({}));

    expect(res).toEqual(expectedState);
    expect(res.feedSucceed).toEqual(expectedState.feedSucceed);
  });

  it('Should handle getFeedFailed', () => {
    const expectedState: TFeedState = {
      ...initialState,
      feedFailed: true,
      errorMsg: FEED_ERROR_MSG
    };
    const res: TFeedState = feedReducer(initialState, getFeedFailed({ errorMsg: FEED_ERROR_MSG }));

    expect(res).toEqual(expectedState);
    expect(res.errorMsg).toEqual(expectedState.errorMsg);
  });

  it('Should handle fetchFeedData', () => {
    const data: TFeedData = {
      success: true,
      orders: [feedOrderData],
      total: 31994,
      totalToday: 108
    };
    const expectedState: TFeedState = {
      ...initialState,
      totalData: data.total && data.totalToday
        ? {
          total: data.total.toString(),
          totalToday: data.totalToday.toString()
        }
        : {
          ...initialState.totalData
        },
      feedOrders: [
        {...data.orders[0], updatedAt: formatDate(data.orders[0].updatedAt)}
      ],
      feedOrdersDone: [
        feedOrderData.number.toString()
      ]
    };
    const res: TFeedState = feedReducer(initialState, fetchFeedData({ data }));

    expect(res).toEqual(expectedState);
    expect(res.feedOrdersDone[0]).toEqual(expectedState.feedOrdersDone[0]);
    expect(res.totalData.total).toEqual(expectedState.totalData.total);
    expect(res.totalData.totalToday).toEqual(expectedState.totalData.totalToday);
  });

  it('Should handle disconnect', () => {
    const res: TFeedState = feedReducer(initialState, disconnect({}));

    expect(res).toEqual(initialState);
  });
});
