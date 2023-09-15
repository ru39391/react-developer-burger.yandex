import {
  INGREDIENTS_ALIAS,
  RESPONSE_ERROR_MSG
} from '../../utils/constants';
import Api from '../../utils/api';
import {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailed
} from '../reducers/products-data';

const api = new Api(INGREDIENTS_ALIAS);

/*
export function getItems() {
  return function(dispatch) {
    dispatch(getItemsRequest());
    api
      .getData()
      .then(res => {
        if (res && res.success) {
          dispatch(getItemsSuccess({ items: res.data }));
        } else {
          dispatch(getItemsFailed());
        }
      });
  };
}
*/

const getItems = () => async dispatch => {
  dispatch(getItemsRequest())
  try {
    const res = await api.getData();
    if (res && res.success) {
      dispatch(getItemsSuccess({ items: res.data }))
    } else {
      dispatch(getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err) {
    dispatch(getItemsFailed({ errorMsg: err }))
  }
}

export {
  getItems
};
