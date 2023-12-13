import { createSlice } from '@reduxjs/toolkit'

import { TProductData } from '../../types/data';

export type TProductsState = {
  items: Array<TProductData>;
  itemsRequest: boolean;
  itemsFailed: boolean;

  item: TProductData | {};

  errorMsg?: string;
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
    getItemsRequest: (state: TProductsState, action) => ({
      ...state,
      itemsRequest: true
    }),
    getItemsSuccess: (state: TProductsState, action) => ({
      ...state,
      items: action.payload.data,
      itemsRequest: false,
      itemsFailed: false
    }),
    fetchItemSuccess: (state: TProductsState, action) => ({
      ...state,
      item: action.payload.item,
      itemsRequest: false,
      itemsFailed: false
    }),
    getItemsFailed: (state: TProductsState, action) => ({
      ...state,
      itemsRequest: false,
      itemsFailed: true,
      errorMsg: action.payload.errorMsg
    }),
    setItemDetails: (state: TProductsState, action) => ({
      ...state,
      item: {...action.payload}
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
