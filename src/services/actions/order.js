import {
  ORDERS_ALIAS,
  RESPONSE_ERROR_MSG,
  ACTION_ERROR_MSG
} from '../../utils/constants';
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed
} from '../slices/order-slice';
import Api from '../../utils/api';

const orderApi = new Api(ORDERS_ALIAS);

const checkout = (arr) => async dispatch => {
  dispatch(getOrderRequest())
  try {
    const res = await orderApi.checkout(arr);
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
