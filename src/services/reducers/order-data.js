import { createSlice } from '@reduxjs/toolkit'
import {
  ID_KEY,
  PRICE_KEY
} from '../../utils/constants';

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
      bunItems: [...state.bunItems].map(item => action.payload.item)
    }),
    removeItem: (state, action) => ({
      ...state,
      mainItems: [...state.mainItems].filter((_, index) => index !== action.payload.index)
    }),
    updateOrderList(state, action) {
      const { draggedItem, targetItem } = action.payload;

      const updatedItems = [...state.mainItems];
      updatedItems[draggedItem.index] = targetItem.product;
      updatedItems[targetItem.index] = draggedItem.product;

      return {
        ...state,
        mainItems: [...updatedItems]
      }
    },
    setOrderData(state, action) {
      const addedItems = state.bunItems.filter(item => Boolean(item)).length ? [...state.bunItems, ...state.mainItems] : [...state.mainItems];

      return {
        ...state,
        orderList: addedItems.map(item => item[ID_KEY]),
        summ: addedItems.map(item => item[PRICE_KEY]).reduce((summ, value) => summ + value, 0)
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
} = orderDataSlice.actions
export default orderDataSlice.reducer;
