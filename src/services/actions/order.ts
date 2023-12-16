import { Dispatch } from 'redux';
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
import type { TAppThunk } from '../../services/store';

const api: Api = new Api(ORDERS_ALIAS);

const checkout = (arr: string[]): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getOrderRequest({}))
  try {
    const res = await api.checkout(arr);
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
