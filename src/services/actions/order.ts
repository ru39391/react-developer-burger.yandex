import { Dispatch } from 'redux';
import { ACTION_ERROR_MSG } from '../../utils/constants';
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed
} from '../slices/order-slice';
import orderApi from '../../utils/orderApi';
import type { TAppThunk } from '../../services/store';

const checkout = (jwt: string, arr: string[]): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getOrderRequest({}))
  try {
    const res = await orderApi.checkout(jwt, arr);
    if (res && res.success) {
      const { name, order }: { name: string; order: { number: number; }; } = res;
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
