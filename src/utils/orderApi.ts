import BaseApi from './baseApi';
import { ORDERS_ALIAS, RESPONSE_ERROR_MSG } from './constants';
import { TFeedData, TOrderDataRes } from '../types';

class OrderApi extends BaseApi {
  public checkout(jwt: string, idsArr: string[]): Promise<TOrderDataRes> {
    return fetch(this._path, {
      method: 'POST',
      headers: this._setHeaders(jwt),
      body: JSON.stringify({
        ingredients: idsArr
      })
    })
      .then((res: Response) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  public getOrderData(id: string): Promise<TFeedData> {
    return fetch(`${this._path}/${id}`, {
      headers: this._setHeaders()
    })
      .then((res: Response) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

const orderApi: OrderApi = new OrderApi(ORDERS_ALIAS);

export default orderApi;
