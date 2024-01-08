import Api from './api';
import { ORDERS_ALIAS, RESPONSE_ERROR_MSG } from './constants';

import { TFeedData } from '../types';

class OrderApi extends Api {
  public getOrderData(id: string): Promise<TFeedData> {
    return fetch(`${this._path}/${id}`, {
      headers: this._setHeaders()
    })
      .then((res: Response) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

const orderApi: OrderApi = new OrderApi(ORDERS_ALIAS);

export default orderApi;
