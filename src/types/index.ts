import { TProductsState } from '../services/slices/products-slice';
import { TOrderState } from '../services/slices/order-slice';
import { TUserState } from '../services/slices/user-slice';

export type TRootState = {
  products: TProductsState;
  order: TOrderState;
  user: TUserState;
};
