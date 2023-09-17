import productDataReducer from './products-data';
import orderDataReducer from './order-data';

const reducer = {
  productData: productDataReducer,
  orderData: orderDataReducer
};

export default reducer;
