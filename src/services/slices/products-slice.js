import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    getItemsRequest: (state, action) => ({
      ...state,
      itemsRequest: true
    }),
    getItemsSuccess: (state, action) => ({
      ...state,
      items: action.payload.data,
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
} = productsSlice.actions
export default productsSlice.reducer;
