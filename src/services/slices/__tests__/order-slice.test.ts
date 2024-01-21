import { v4 as uuidv4 } from 'uuid';
import {
  orderReducer,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  addItem,
  addBunItem,
  removeItem,
  updateOrderList,
  setOrderData
} from '../order-slice';

import type { TOrderData, TProductData } from '../../../types';
import type { TOrderState, TOrderAction } from '../order-slice';

import { RESPONSE_ERROR_MSG, ID_KEY, PRICE_KEY } from '../../../utils/constants';

const initialState: TOrderState = {
  bunItems: [...Array(2)],
  mainItems: [],
  order: {},
  orderList: [],
  orderRequest: false,
  orderFailed: false,
  summ: 0,
  errorMsg: '',
};

const orderData: TOrderData = {
  id: 32338,
  name: 'Антарианский spicy флюоресцентный space бургер',
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

const key = uuidv4();

describe('order reducer', () => {
  test('Should return the initial state', () => {
    const action: { type: string | undefined } & TOrderAction = {
      type: undefined,
      payload: {}
    };

    expect(orderReducer(undefined, action)).toEqual(initialState);
  });

  it('Should handle getOrderRequest', () => {
    const expectedState: TOrderState = {
      ...initialState,
      orderRequest: true
    };
    const res: TOrderState = orderReducer(initialState, getOrderRequest({}));

    expect(res).toEqual(expectedState);
    expect(res.orderRequest).toEqual(expectedState.orderRequest);
  });

  it('Should handle getOrderSuccess', () => {
    const expectedState: TOrderState = {
      ...initialState,
      order: {...orderData}
    };
    const res: TOrderState = orderReducer(initialState, getOrderSuccess({ data: {...orderData} }));

    expect(res).toEqual(expectedState);
    expect(res.order.id).toEqual(expectedState.order.id);
    expect(res.order.name).toEqual(expectedState.order.name);
  });

  it('Should handle getOrderFailed', () => {
    const expectedState: TOrderState = {
      ...initialState,
      orderFailed: true,
      errorMsg: RESPONSE_ERROR_MSG
    };
    const res: TOrderState = orderReducer(initialState, getOrderFailed({ errorMsg: RESPONSE_ERROR_MSG }));

    expect(res).toEqual(expectedState);
    expect(res.errorMsg).toEqual(expectedState.errorMsg);
  });

  it('Should handle addItem', () => {
    const expectedState: TOrderState = {
      ...initialState,
      mainItems: [...initialState.mainItems, {...productData, key}]
    };
    const res: TOrderState = orderReducer(initialState, addItem({ item: {...productData} }));
    const handledRes: TOrderState = {
      ...res,
      mainItems: [...res.mainItems].map(item => ({...item, key}))
    };

    expect(handledRes).toEqual(expectedState);
    expect(handledRes.mainItems[0][PRICE_KEY]).toEqual(expectedState.mainItems[0][PRICE_KEY]);
    expect(2 * handledRes.mainItems[0][PRICE_KEY]).toEqual(2 * expectedState.mainItems[0][PRICE_KEY]);
  });

  it('Should handle addBunItem', () => {
    const expectedState: TOrderState = {
      ...initialState,
      bunItems: [...initialState.bunItems].map(() => ({...productData, key}))
    };
    const res: TOrderState = orderReducer(initialState, addBunItem({ item: {...productData} }));
    const handledRes: TOrderState = {
      ...res,
      bunItems: [...res.bunItems].map(item => ({...item, key}))
    };

    expect(handledRes).toEqual(expectedState);
    expect(handledRes.bunItems[0][PRICE_KEY]).toEqual(expectedState.bunItems[0][PRICE_KEY]);
    expect(2 * handledRes.bunItems[0][PRICE_KEY]).toEqual(2 * expectedState.bunItems[0][PRICE_KEY]);
  });

  it('Should handle removeItem', () => {
    const currentState: TOrderState = {
      ...initialState,
      mainItems: [...initialState.mainItems, {...productData, key}]
    };
    const res: TOrderState = orderReducer(currentState, removeItem({ index: 0 }));

    expect(res).toEqual(initialState);
  });

  it('Should handle updateOrderList', () => {
    const products = [...Array(2)].map(() => ({...productData, key}));
    const items = [...products].map((product, index) => ({product, index}));
    const currentState: TOrderState = {
      ...initialState,
      mainItems: [...products]
    };
    const expectedState: TOrderState = {...currentState};
    const res: TOrderState = orderReducer(currentState, updateOrderList({ items: {draggedItem: items[0], targetItem: items[1]} }));

    expect(res).toEqual(expectedState);
    expect(res.mainItems[0][PRICE_KEY]).toEqual(expectedState.mainItems[0][PRICE_KEY]);
    expect(2 * res.mainItems[0][PRICE_KEY]).toEqual(2 * expectedState.mainItems[0][PRICE_KEY]);
  });

  it('Should handle setOrderData', () => {
    const products = [...Array(3)].map(() => ({...productData, key}));
    const currentState: TOrderState = {
      ...initialState,
      mainItems: [...products]
    };
    const expectedState: TOrderState = {
      ...currentState,
      orderList: [...products].map(item => item[ID_KEY]),
      summ: [...products].reduce((summ, item) => summ + item[PRICE_KEY], 0),
    };
    const res: TOrderState = orderReducer(currentState, setOrderData({}));

    expect(res).toEqual(expectedState);
    expect(res.summ).toEqual(expectedState.summ);
    expect(2 * res.summ).toEqual(2 * expectedState.summ);
  });
});
