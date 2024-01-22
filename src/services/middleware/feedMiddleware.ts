import { AnyAction } from '@reduxjs/toolkit';

import type { Middleware, MiddlewareAPI } from 'redux'
import type { TRootState, TThunkDispatch } from '../store';
import type { TFeedActions } from '../slices';
import type { TFeedData } from '../../types';

import { FEED_ERROR_MSG } from '../../utils/constants';

const feedMiddleware = (actions: TFeedActions): Middleware => {
  return ((store: MiddlewareAPI<TThunkDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AnyAction) => {
      const { dispatch } = store;
      const {
        getFeedRequest,
        getFeedSuccess,
        getFeedFailed,
        fetchFeedData,
        disconnect
      } = actions;

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
