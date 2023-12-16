import { Component } from 'react';
import {
  API_URL,
  USER_URL,
  RESPONSE_ERROR_MSG
} from './constants';

import { TCustomData, TUserDataRes, TLoginDataRes } from '../types';

class userApi extends Component<{}> {
  private _path: string;

  constructor(path: string) {
    super({});
    this._path = `${API_URL}${path}/`;
  }

  private _setHeaders(jwt: string = ''): TCustomData<string> {
    return jwt
      ? {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`
      }
      : {
        'Content-Type': 'application/json'
      };
  }

  private _checkResponse(result: Response, resultAlert: string): Promise<any> {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  public getAccessToken(data: TCustomData<string>, alias: string = ''): Promise<any> {
    const params = {
      method: 'GET',
      headers: this._setHeaders(data.jwt),
    };
    return fetch(`${this._path}${alias}`, data.jwt
      ? params
      : {
        ...params,
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  public fetchData(data: { jwt?: string; values: TCustomData<string>; }, alias: string = ''): Promise<TUserDataRes> {
    return fetch(`${this._path}${alias}`, {
      method: alias === USER_URL ? 'PATCH' : 'POST',
      headers: this._setHeaders(data.jwt),
      body: JSON.stringify(data.values)
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  public recoverPassword(data: TCustomData<string>, alias: string = ''): Promise<any> {
    return fetch(`${this._path}${alias}`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(data)
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

export default userApi;
