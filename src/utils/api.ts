import { Component } from 'react';
import {
  API_URL,
  RESPONSE_ERROR_MSG
} from './constants';

import {
  TCustomData,
  TOrderDataRes,
  TProductDataRes
} from '../types';

class Api extends Component<{}> {
  _path: string;

  constructor(path: string) {
    super({});
    this._path = `${API_URL}${path}`;
  }

  _setHeaders(): TCustomData<string> {
    return {
      'Content-Type': 'application/json'
    }
  }

  _checkResponse(result: Response, resultAlert: string): Promise<any> {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  getData(): Promise<TProductDataRes> {
    return fetch(this._path, {
      headers: this._setHeaders()
    })
      .then((res: Response) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  checkout(idsArr: string[]): Promise<TOrderDataRes> {
    return fetch(this._path, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({
        ingredients: idsArr
      })
    })
      .then((res: Response) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

export default Api;
