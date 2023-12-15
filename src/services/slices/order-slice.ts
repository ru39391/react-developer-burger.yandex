import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import {
  ID_KEY,
  PRICE_KEY
} from '../../utils/constants';

import type {
  TDefaultData,
  TProduct,
  TOrder,
  TDraggableItem
} from '../../types';

type TOrderAction = {
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

  order: TOrder | TDefaultData;
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
      errorMsg: action.payload.errorMsg || ''
    }),
    addItem: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      mainItems: action.payload.item
        ? [...state.mainItems, {...action.payload.item, key: uuidv4()}]
        : [...state.mainItems]
    }),
    addBunItem: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      bunItems: action.payload.item
        ? [...state.bunItems].map(() => ({...action.payload.item, key: uuidv4()}))
        : [...Array(2)]
    }),
    removeItem: (state: TOrderState, action: TOrderAction) => ({
      ...state,
      mainItems: [...state.mainItems].filter((_: TProduct, index: number) => index !== action.payload.index)
    }),
    updateOrderList(state: TOrderState, action: TOrderAction) {
      const { draggedItem, targetItem } = action.payload.items || {};

      const updatedItems = [...state.mainItems];
      updatedItems[draggedItem.index] = targetItem.product;
      updatedItems[targetItem.index] = draggedItem.product;

      return {
        ...state,
        mainItems: [...updatedItems]
      }
    },
    setOrderData(state: TOrderState, action: TOrderAction) {
      const addedItems = state.bunItems.filter((item: TProduct) => Boolean(item)).length ? [...state.bunItems, ...state.mainItems] : [...state.mainItems];

      return {
        ...state,
        orderList: addedItems.map((item: TProduct) => item[ID_KEY]),
        summ: addedItems.map((item: TProduct) => item[PRICE_KEY]).reduce((summ: number, value: number) => summ + value, 0)
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
