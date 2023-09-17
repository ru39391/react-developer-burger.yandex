import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],

  order: {},
  orderRequest: false,
  orderFailed: false,

  errorMsg: '',
};

const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    getOrderRequest(state, action) {
      state.orderRequest = true
    },
    getOrderSuccess(state, action) {
      state.order = {...action.payload};
      state.orderRequest = false;
      state.orderFailed = false;
    },
    getOrderFailed(state, action) {
      state.orderRequest = false;
      state.orderFailed = true;
      state.errorMsg = action.payload.errorMsg;
    },
    addItem(state, action) {
      state.items.push(action.payload.item);
    },
    replaceItem(state, action) {
      const { item: data } = action.payload;
      if(state.items.length) {
        const items = state.items.map(item => item.type === data.type ? data : item);
        state.items.find(item => item.type === data.type) ? state.items = items  : state.items.push(data);
      } else {
        state.items.push(data);
      };
    }
  }
});

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  addItem,
  replaceItem
} = orderDataSlice.actions
export default orderDataSlice.reducer;
