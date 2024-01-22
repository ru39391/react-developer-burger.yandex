import BaseApi from './baseApi';
import { INGREDIENTS_ALIAS, RESPONSE_ERROR_MSG } from './constants';
import { TProductDataRes } from '../types';

class ProductApi extends BaseApi {
  public getData(): Promise<TProductDataRes> {
    return fetch(this._path, {
      headers: this._setHeaders()
    })
      .then((res: Response) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

const productApi: ProductApi = new ProductApi(INGREDIENTS_ALIAS);

export default productApi;
