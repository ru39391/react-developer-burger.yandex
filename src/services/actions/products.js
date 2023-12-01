import {
  INGREDIENTS_ALIAS,
  RESPONSE_ERROR_MSG
} from '../../utils/constants';
import {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailed,
  fetchItemSuccess
} from '../slices/products-slice';
import Api from '../../utils/api';

const api = new Api(INGREDIENTS_ALIAS);

const getItems = () => async dispatch => {
  dispatch(getItemsRequest())
  try {
    const res = await api.getData();
    if (res && res.success) {
      dispatch(getItemsSuccess({ data: res.data }))
    } else {
      dispatch(getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err) {
    dispatch(getItemsFailed({ errorMsg: err }))
  }
};

const fetchItem = (id) => async dispatch => {
  dispatch(getItemsRequest())
  try {
    const res = await api.getData();
    if (res && res.success) {
      dispatch(fetchItemSuccess({ item: res.data.find(({ _id }) => _id === id) }))
    } else {
      dispatch(getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err) {
    dispatch(getItemsFailed({ errorMsg: err }))
  }
};

export {
  getItems,
  fetchItem
};
