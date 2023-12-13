import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import {
  ID_KEY,
  PRICE_KEY
} from '../../utils/constants';

import {
  TDefaultData,
  TProductData,
  TOrderData
} from '../../types/data';

type TOrderAction = {
  payload: {
    data?: TOrderData | TDefaultData;
    draggedItem?: TProductData;
    targetItem?: TProductData;
    errorMsg?: string;
  };
};

export type TOrderState = {
  bunItems: Array<TProductData>;
  mainItems: Array<TProductData>;

  order: TOrderData | TDefaultData;
  orderList: Array<string>;
  orderRequest: boolean;
  orderFailed: boolean;

  summ: number;

  errorMsg?: string;
};

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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrderRequest: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      orderRequest: true
    }),
    getOrderSuccess: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      order: {...action.payload.data},
      orderRequest: false,
      orderFailed: false
    }),
    getOrderFailed: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      orderRequest: false,
      orderFailed: true,
      errorMsg: action.payload.errorMsg
    }),
    addItem: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      mainItems: [...state.mainItems, {...action.payload.item, key: uuidv4()}]
    }),
    addBunItem: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      bunItems: [...state.bunItems].map(item => ({...action.payload.item, key: uuidv4()}))
    }),
    removeItem: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      mainItems: [...state.mainItems].filter((_, index) => index !== action.payload.index)
    }),
    updateOrderList(state: TOrderState, action: TOrderAction) {
      const { draggedItem, targetItem } = action.payload;

      const updatedItems = [...state.mainItems];
      updatedItems[draggedItem.index] = targetItem.product;
      updatedItems[targetItem.index] = draggedItem.product;

      return {
        ...state,
        mainItems: [...updatedItems]
      }
    },
    setOrderData(state: TOrderState, action: TOrderAction) {
      const addedItems = state.bunItems.filter(item => Boolean(item)).length ? [...state.bunItems, ...state.mainItems] : [...state.mainItems];

      return {
        ...state,
        orderList: addedItems.map(item => item[ID_KEY]),
        summ: addedItems.map(item => item[PRICE_KEY]).reduce((summ, value) => summ + value, 0)
      };
    },
  }
});

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  addItem,
  addBunItem,
  removeItem,
  updateOrderList,
  setOrderData
} = orderSlice.actions
export default orderSlice.reducer;
