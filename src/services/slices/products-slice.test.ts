import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import productApi from '../../utils/productApi';
import {
  productsReducer,
  getItemsRequest,
  getItemsSuccess,
  fetchItemSuccess,
  getItemsFailed,
  setItemDetails
} from './products-slice';
import { getItems } from '../actions/products';

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  item: {},
  errorMsg: '',
};

const productData = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

describe('products reducer', () => {
  test('Should return the initial state', () => {
    const action = {
      type: undefined,
      payload: {}
    };

    expect(productsReducer(undefined, action)).toEqual(initialState)
  });

  it('should handle getItemsRequest', () => {
    const expectedAction = {
      type: 'products/getItemsRequest',
      payload: {}
    };

    expect(getItemsRequest({})).toEqual(expectedAction);
  });

  it('should handle getItemsSuccess, v. 1', () => {
    const data = [productData];
    const expectedAction = {
      type: 'products/getItemsSuccess',
      payload: { data }
    };
    const res = getItemsSuccess({ data });
    const { payload } = res;

    expect(res).toEqual(expectedAction);
    expect(payload.data ? 2 * payload.data[0].price : 0).toEqual(payload.data ? 2 * expectedAction.payload.data[0].price : 0);
  });

  it('should handle getItemsSuccess, v. 2', () => {
    const data = [productData];
    const expectedAction = {
      type: 'products/getItemsSuccess',
      payload: { data }
    };
    const expectedState = {
      ...initialState,
      items: [...data]
    };
    const res = productsReducer(initialState, expectedAction);

    expect(res).toEqual(expectedState);
    expect(res.items[0].price).toEqual(expectedState.items[0].price);
  });

  it('should handle fetchItemSuccess', () => {
    const expectedAction = {
      type: 'products/fetchItemSuccess',
      payload: { item: productData }
    };

    const res = fetchItemSuccess({ item: productData });
    const { payload } = res;

    expect(res).toEqual(expectedAction);
    expect(payload.item && typeof payload.item.price === 'number' ? 2 * payload.item.price : 0).toEqual(payload.item && typeof payload.item.price === 'number' ? 2 * expectedAction.payload.item.price : 0);
  });
});
