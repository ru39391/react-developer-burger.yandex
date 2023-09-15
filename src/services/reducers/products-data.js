import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  currItems: [],

  itemsRequest: false,
  itemsFailed: false,
  errorMsg: '',

  item: {},
  orderItem: {},
};

const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    getItemsRequest(state, action) {
      state.itemsRequest = true
    },
    getItemsSuccess(state, action) {
      state.items = action.payload.items;
      state.itemsRequest = false;
      state.itemsFailed = false;
    },
    getItemsFailed(state, action) {
      state.itemsRequest = false;
      state.itemsFailed = true;
      state.errorMsg = action.payload.errorMsg;
    },
  }
});

export const { getItemsRequest, getItemsSuccess, getItemsFailed } = productDataSlice.actions
export default productDataSlice.reducer;
