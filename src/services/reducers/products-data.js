import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  item: {},

  errorMsg: '',
};

const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    getItemsRequest: (state, action) => ({
      ...state,
      itemsRequest: true
    }),
    getItemsSuccess: (state, action) => ({
      ...state,
      items: action.payload.items,
      itemsRequest: false,
      itemsFailed: false
    }),
    getItemsFailed: (state, action) => ({
      ...state,
      itemsRequest: false,
      itemsFailed: true,
      errorMsg: action.payload.errorMsg
    }),
    setItemDetails: (state, action) => ({
      ...state,
      item: {...action.payload}
    })
  }
});

export const {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailed,
  setItemDetails
} = productDataSlice.actions
export default productDataSlice.reducer;
