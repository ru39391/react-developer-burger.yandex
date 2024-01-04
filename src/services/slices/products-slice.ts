import { createSlice } from '@reduxjs/toolkit'

import type { TProductDefault, TProduct } from '../../types';

type TProductsAction = {
  payload: {
    data?: TProduct[];
    item?: TProduct | TProductDefault;
    errorMsg?: string;
  };
};

export type TProductsState = {
  items: TProduct[];
  itemsRequest: boolean;
  itemsFailed: boolean;

  item: TProduct | TProductDefault;

  errorMsg: string;
};

const initialState: TProductsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  item: {},

  errorMsg: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getItemsRequest: (state, action: TProductsAction) => ({
      ...state,
      itemsRequest: true
    }),
    getItemsSuccess: (state, action: TProductsAction) => ({
      ...state,
      items: action.payload.data || state.items,
      itemsRequest: false,
      itemsFailed: false
    }),
    fetchItemSuccess: (state, action: TProductsAction) => ({
      ...state,
      item: action.payload.item || state.item,
      itemsRequest: false,
      itemsFailed: false
    }),
    getItemsFailed: (state, action: TProductsAction) => ({
      ...state,
      itemsRequest: false,
      itemsFailed: true,
      errorMsg: action.payload.errorMsg || ''
    }),
    setItemDetails: (state, action: TProductsAction) => ({
      ...state,
      item: action.payload.item || state.item,
    })
  }
});

export const {
  reducer: productsReducer,
  actions: productsActions
} = productsSlice;
export const {
  getItemsRequest,
  getItemsSuccess,
  fetchItemSuccess,
  getItemsFailed,
  setItemDetails
} = productsSlice.actions;
