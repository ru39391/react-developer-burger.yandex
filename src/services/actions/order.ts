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
import useAuth from '../../hooks/useAuth';
import type { TAppThunk } from '../../services/store';

const api: Api = new Api(ORDERS_ALIAS);

const checkout = (arr: string[]): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getOrderRequest({}))
  try {
    const { accessToken } = useAuth();
    const jwt: string | undefined = typeof accessToken === 'object' && accessToken !== undefined ? accessToken.token : undefined;
    const res = await api.checkout(jwt as string, arr);
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
