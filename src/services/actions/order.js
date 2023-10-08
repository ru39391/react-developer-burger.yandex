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

const api = new Api(ORDERS_ALIAS);

const checkout = (arr) => async dispatch => {
  dispatch(getOrderRequest())
  try {
    const res = await api.checkout(arr);
    if (res && res.success) {
      const { name, order } = res;
      dispatch(getOrderSuccess({ data: { name, id: order.number } }))
    } else {
      dispatch(getOrderFailed({ errorMsg: ACTION_ERROR_MSG }))
    }
  } catch (err) {
    dispatch(getOrderFailed({ errorMsg: err }))
  }
};

export {
  checkout
};
