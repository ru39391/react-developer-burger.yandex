import productsReducer from './products-slice';
import orderReducer from './order-slice';
import userReducer from './user-slice';

const reducer = {
  products: productsReducer,
  order: orderReducer,
  user: userReducer
};

export default reducer;
