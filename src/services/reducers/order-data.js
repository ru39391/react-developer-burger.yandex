import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bunItems: [...Array(2)],
  mainItems: [],

  order: {},
  orderList: [],
  orderRequest: false,
  orderFailed: false,

  summ: 0,

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
      order: {...action.payload.data},
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
    }),
    setOrderData(state, action) {
      const { idKey, priceKey } = action.payload;
      const addedItems = state.bunItems.filter(item => Boolean(item)).length ? [...state.bunItems, ...state.mainItems] : [...state.mainItems];

      return {
        ...state,
        orderList: addedItems.map(item => item[idKey]),
        summ: addedItems.map(item => item[priceKey]).reduce((summ, value) => summ + value, 0)
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
  setOrderData
} = orderDataSlice.actions
export default orderDataSlice.reducer;
