import {
  INGREDIENTS_ALIAS,
  ORDERS_ALIAS,
  RESPONSE_ERROR_MSG,
  ACTION_ERROR_MSG
} from '../../utils/constants';
import Api from '../../utils/api';
import {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailed
} from '../reducers/products-data';
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed
} from '../reducers/order-data';

const [dataApi, orderApi] = [INGREDIENTS_ALIAS, ORDERS_ALIAS].map(item => new Api(item));

const getItems = () => async dispatch => {
  dispatch(getItemsRequest())
  try {
    const res = await dataApi.getData();
    if (res && res.success) {
      dispatch(getItemsSuccess({ data: res.data }))
    } else {
      dispatch(getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err) {
    dispatch(getItemsFailed({ errorMsg: err }))
  }
};

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
  getItems,
  checkout
};
