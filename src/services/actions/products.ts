import { Dispatch } from 'redux';
import { RESPONSE_ERROR_MSG } from '../../utils/constants';
import {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailed,
  fetchItemSuccess
} from '../slices/products-slice';
import productApi from '../../utils/productApi';
import type { TAppThunk } from '../../services/store';

const getItems = (): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getItemsRequest({}))
  try {
    const res = await productApi.getData();
    if (res && res.success) {
      dispatch(getItemsSuccess({ data: res.data }))
    } else {
      dispatch(getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err: unknown) {
    dispatch(getItemsFailed({ errorMsg: err as string }))
  }
};

const fetchItem = (id: string): TAppThunk<void> => async (dispatch: Dispatch) => {
  dispatch(getItemsRequest({}))
  try {
    const res = await productApi.getData();
    if (res && res.success) {
      dispatch(fetchItemSuccess({ item: res.data.find(({ _id }) => _id === id) }))
    } else {
      dispatch(getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }))
    }
  } catch (err: unknown) {
    dispatch(getItemsFailed({ errorMsg: err as string }))
  }
};

export {
  getItems,
  fetchItem
};
