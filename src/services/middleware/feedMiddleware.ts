import { AnyAction } from '@reduxjs/toolkit';

import type { Middleware, MiddlewareAPI } from 'redux'
import type { TRootState, TAppDispatch } from '../store';
import type { TFeedData } from '../../types';

import {
  getFeedRequest,
  getFeedSuccess,
  getFeedFailed,
  fetchFeedData,
  disconnect
} from '../slices/feed-slice';
import { FEED_ERROR_MSG } from '../../utils/constants';

const feedMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AnyAction) => {
      const { dispatch } = store;

      if (getFeedRequest.match(action)) {
        const { url } = action.payload;
        socket = new WebSocket(url as string);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch(getFeedSuccess({}));
        };

        socket.onmessage = (event: MessageEvent) => {
          const data: TFeedData = JSON.parse(event.data);
          if(data.success && data.orders.length) {
            dispatch(fetchFeedData({ data }));
          }
        };

        socket.onerror = (event: Event) => {
          dispatch(getFeedFailed({ errorMsg: FEED_ERROR_MSG }));
        };

        socket.onclose = (event: CloseEvent) => {
          const errorMsg = event.wasClean
            ? `Соединение успешно закрыто (код ${event.code.toString()}), причина: ${event.reason}`
            : `Соединение закрыто с кодом ${event.code.toString()}`

          dispatch(disconnect({ errorMsg }));
        };
      }

      if (socket && disconnect.match(action)) {
        //socket.close();
      }

      next(action);
    };
  }) as Middleware;
}

export default feedMiddleware;
