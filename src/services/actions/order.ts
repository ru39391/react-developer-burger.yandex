import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import {
  ORDERS_ALIAS,
  ACTION_ERROR_MSG
} from '../../utils/constants';
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed
} from '../slices/order-slice';
import Api from '../../utils/api';
import { TRootState } from '../../types';

const api = new Api(ORDERS_ALIAS);
//: ThunkAction<void, TRootState, unknown, AnyAction>
const checkout = (arr: Array<string>) => async (dispatch: Dispatch) => {
  dispatch(getOrderRequest({}))
  try {
    const res = await api.checkout(arr);
    if (res && res.success) {
      const { name, order } = res;
      dispatch(getOrderSuccess({ data: { name, id: order.number } }))
    } else {
      dispatch(getOrderFailed({ errorMsg: ACTION_ERROR_MSG }))
    }
  } catch (err: unknown) {
    dispatch(getOrderFailed({ errorMsg: err as string }))
  }
};

export {
  checkout
};
