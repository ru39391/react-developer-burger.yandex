import {
  productsReducer,
  getItemsRequest,
  getItemsSuccess,
  fetchItemSuccess,
  getItemsFailed,
  setItemDetails
} from '../products-slice';

import type { TProductData } from '../../../types';
import type { TProductsState, TProductsAction } from '../products-slice';

import { RESPONSE_ERROR_MSG, PRICE_KEY } from '../../../utils/constants';

const initialState: TProductsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  item: {},
  errorMsg: '',
};

const productData: TProductData = {
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
    const action: { type: string | undefined } & TProductsAction = {
      type: undefined,
      payload: {}
    };

    expect(productsReducer(undefined, action)).toEqual(initialState);
  });

  it('Should handle getItemsRequest', () => {
    const expectedState: TProductsState = {
      ...initialState,
      itemsRequest: true
    };
    const res: TProductsState = productsReducer(initialState, getItemsRequest({}));

    expect(res).toEqual(expectedState);
    expect(res.itemsRequest).toEqual(expectedState.itemsRequest);
  });

  it('Should handle getItemsSuccess', () => {
    const data: TProductData[] = [productData];
    const expectedState: TProductsState = {
      ...initialState,
      items: [...data]
    };
    const res: TProductsState = productsReducer(initialState, getItemsSuccess({ data }));

    expect(res).toEqual(expectedState);
    expect(res.items[0][PRICE_KEY]).toEqual(expectedState.items[0][PRICE_KEY]);
    expect(2 * res.items[0][PRICE_KEY]).toEqual(2 * expectedState.items[0][PRICE_KEY]);
  });

  it('Should handle fetchItemSuccess', () => {
    const expectedState: TProductsState = {
      ...initialState,
      item: {...productData}
    };
    const res: TProductsState = productsReducer(initialState, fetchItemSuccess({ item: productData }));

    expect(res).toEqual(expectedState);
    expect(res.item[PRICE_KEY]).toEqual(expectedState.item[PRICE_KEY]);
    expect(typeof res.item[PRICE_KEY] === 'number' ? 2 * res.item[PRICE_KEY] : 0).toEqual(typeof expectedState.item[PRICE_KEY] === 'number' ? 2 * expectedState.item[PRICE_KEY] : 0);
  });

  it('Should handle getItemsFailed', () => {
    const expectedState: TProductsState = {
      ...initialState,
      itemsFailed: true,
      errorMsg: RESPONSE_ERROR_MSG
    };
    const res: TProductsState = productsReducer(initialState, getItemsFailed({ errorMsg: RESPONSE_ERROR_MSG }));

    expect(res).toEqual(expectedState);
    expect(res.errorMsg).toEqual(expectedState.errorMsg);
  });

  it('Should handle setItemDetails', () => {
    const expectedState: TProductsState = {
      ...initialState,
      item: {...productData}
    };
    const res: TProductsState = productsReducer(initialState, setItemDetails({ item: productData }));

    expect(res).toEqual(expectedState);
    expect(res.item[PRICE_KEY]).toEqual(expectedState.item[PRICE_KEY]);
    expect(typeof res.item[PRICE_KEY] === 'number' ? 2 * res.item[PRICE_KEY] : 0).toEqual(typeof expectedState.item[PRICE_KEY] === 'number' ? 2 * expectedState.item[PRICE_KEY] : 0);
  });
});
