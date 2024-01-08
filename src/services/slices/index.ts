import { productsReducer, productsActions } from './products-slice';
import { orderReducer, orderActions } from './order-slice';
import { userReducer, userActions } from './user-slice';

const reducer = {
  products: productsReducer,
  order: orderReducer,
  user: userReducer
};

export type TAppActions = typeof productsActions | typeof orderActions | typeof userActions;
export default reducer;
