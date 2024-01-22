import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import {
  ID_KEY,
  PRICE_KEY
} from '../../utils/constants';

import type {
  TCustomData,
  TProduct,
  TOrder,
  TDraggableItem
} from '../../types';

export type TOrderAction = {
  payload: {
    index?: number;
    data?: TOrder;
    item?: TProduct;
    items?: {
      [key: string]: TDraggableItem;
    };
    errorMsg?: string;
  };
};

export type TOrderState = {
  bunItems: TProduct[];
  mainItems: TProduct[];

  order: TOrder | TCustomData<string | number>;
  orderList: string[];
  orderRequest: boolean;
  orderFailed: boolean;

  summ: number;

  errorMsg: string;
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
    getOrderRequest: (state, action: TOrderAction) => ({
      ...state,
      orderRequest: true
    }),
    getOrderSuccess: (state, action: TOrderAction) => ({
      ...state,
      bunItems: [...Array(2)],
      mainItems: [],
      order: {...action.payload.data},
      orderRequest: false,
      orderFailed: false
    }),
    getOrderFailed: (state, action: TOrderAction) => ({
      ...state,
      orderRequest: false,
      orderFailed: true,
      errorMsg: action.payload.errorMsg || ''
    }),
    addItem: (state, action: TOrderAction) => ({
      ...state,
      mainItems: action.payload.item
        ? [...state.mainItems, {...action.payload.item, key: uuidv4()}]
        : [...state.mainItems],
      order: {}
    }),
    addBunItem: (state, action: TOrderAction) => ({
      ...state,
      bunItems: action.payload.item
        ? [...state.bunItems].map(() => ({...action.payload.item, key: uuidv4()}))
        : [...Array(2)],
      order: {}
    }),
    removeItem: (state, action: TOrderAction) => ({
      ...state,
      mainItems: [...state.mainItems].filter((_, index) => index !== action.payload.index)
    }),
    updateOrderList(state, action: TOrderAction) {
      const { draggedItem, targetItem } = action.payload.items || {};

      const updatedItems = [...state.mainItems];
      updatedItems[draggedItem.index] = targetItem.product;
      updatedItems[targetItem.index] = draggedItem.product;

      return {
        ...state,
        mainItems: [...updatedItems]
      }
    },
    setOrderData(state, action: TOrderAction) {
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
  reducer: orderReducer,
  actions: orderActions
} = orderSlice;
export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  addItem,
  addBunItem,
  removeItem,
  updateOrderList,
  setOrderData
} = orderSlice.actions;
export {
  initialState
};
