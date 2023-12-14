import { createSlice } from '@reduxjs/toolkit'

import type { TDefaultData, TProduct } from '../../types';

type TProductsAction = {
  payload: {
    data?: TProduct[];
    item?: TProduct | TDefaultData;
    errorMsg?: string;
  };
};

export type TProductsState = {
  items: TProduct[];
  itemsRequest: boolean;
  itemsFailed: boolean;

  item: TProduct | TDefaultData;

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
    getItemsRequest: (state: TProductsState, action: TProductsAction) => ({
      ...state,
      itemsRequest: true
    }),
    getItemsSuccess: (state: TProductsState, action: TProductsAction) => ({
      ...state,
      items: action.payload.data || state.items,
      itemsRequest: false,
      itemsFailed: false
    }),
    fetchItemSuccess: (state: TProductsState, action: TProductsAction) => ({
      ...state,
      item: action.payload.item || state.item,
      itemsRequest: false,
      itemsFailed: false
    }),
    getItemsFailed: (state: TProductsState, action: TProductsAction) => ({
      ...state,
      itemsRequest: false,
      itemsFailed: true,
      errorMsg: action.payload.errorMsg || ''
    }),
    setItemDetails: (state: TProductsState, action: TProductsAction) => ({
      ...state,
      item: action.payload.item || state.item,
    })
  }
});

export const {
  getItemsRequest,
  getItemsSuccess,
  fetchItemSuccess,
  getItemsFailed,
  setItemDetails
} = productsSlice.actions
export default productsSlice.reducer;
