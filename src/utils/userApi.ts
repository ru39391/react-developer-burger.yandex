import BaseApi from './baseApi';
import {
  AUTH_ALIAS,
  RESET_PASSWORD_ALIAS,
  USER_URL,
  RESPONSE_ERROR_MSG
} from './constants';
import {
  TCustomData,
  TAuthResponse,
  TPasswordResponse
} from '../types';

class UserApi extends BaseApi {
  public getAccessToken(data: TCustomData<string>, alias: string = ''): Promise<TAuthResponse> {
    const params = {
      method: 'GET',
      headers: this._setHeaders(data.jwt),
    };
    return fetch(`${this._path}/${alias}`, data.jwt
      ? params
      : {
        ...params,
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  public handleUser(data: { jwt?: string; values: TCustomData<string>; }, alias: string = ''): Promise<TAuthResponse> {
    return fetch(`${this._path}/${alias}`, {
      method: alias === USER_URL ? 'PATCH' : 'POST',
      headers: this._setHeaders(data.jwt),
      body: JSON.stringify(data.values)
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  public recoverPassword(data: TCustomData<string>, alias: string = ''): Promise<TPasswordResponse> {
    return fetch(`${this._path}/${alias}`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(data)
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

const userApi: UserApi = new UserApi(AUTH_ALIAS);
const passwordApi: UserApi = new UserApi(RESET_PASSWORD_ALIAS);

export {
  userApi,
  passwordApi
};
