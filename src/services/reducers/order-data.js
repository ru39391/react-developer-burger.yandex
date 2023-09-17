import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bunItems: [...Array(2)],
  mainItems: [],

  order: {},
  orderList: [],
  orderRequest: false,
  orderFailed: false,

  errorMsg: '',
};

const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    getOrderRequest: (state, action) => ({
      ...state,
      orderRequest: true
    }),
    getOrderSuccess: (state, action) => ({
      ...state,
      order: {...action.payload},
      orderRequest: false,
      orderFailed: false
    }),
    getOrderFailed: (state, action) => ({
      ...state,
      orderRequest: false,
      orderFailed: true,
      errorMsg: action.payload.errorMsg
    }),
    addItem: (state, action) => ({
      ...state,
      mainItems: [...state.mainItems, action.payload.item]
    }),
    addBunItem: (state, action) => ({
      ...state,
      bunItems: state.bunItems.map(item => action.payload.item)
    })
  }
});

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  addItem,
  addBunItem
} = orderDataSlice.actions
export default orderDataSlice.reducer;
