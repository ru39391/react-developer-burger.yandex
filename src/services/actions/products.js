import {
  INGREDIENTS_ALIAS,
  RESPONSE_ERROR_MSG
} from '../../utils/constants';
import {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailed
} from '../slices/products-slice';
import Api from '../../utils/api';

const productsApi = new Api(INGREDIENTS_ALIAS);

const getItems = () => async dispatch => {
  dispatch(getItemsRequest())
  try {
    const res = await productsApi.getData();
    if (res && res.success) {
      dispatch(getItemsSuccess({ data: res.data }))
    } else {
      dispatch(getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err) {
    dispatch(getItemsFailed({ errorMsg: err }))
  }
};

export {
  getItems
};
