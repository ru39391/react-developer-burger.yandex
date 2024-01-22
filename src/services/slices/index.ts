import { productsReducer, productsActions } from './products-slice';
import { orderReducer, orderActions } from './order-slice';
import { userReducer, userActions } from './user-slice';
import { feedReducer, feedActions } from './feed-slice';

const reducer = {
  products: productsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer
};

export type TFeedActions = typeof feedActions;
export type TAppActions = typeof productsActions | typeof orderActions | typeof userActions;
export default reducer;
