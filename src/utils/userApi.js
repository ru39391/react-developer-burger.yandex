import React, { FC } from 'react';
import {
  API_URL,
  USER_URL,
  RESPONSE_ERROR_MSG
} from './constants';

class userApi extends React.Component {
  constructor(path) {
    super();
    this._path = `${API_URL}${path}/`;
  }

  _setHeaders(jwt = '') {
    return jwt
      ? {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`
      }
      : {
        'Content-Type': 'application/json'
      };
  }

  _checkResponse(result, resultAlert) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  getAccessToken(data, alias = '') {
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

  fetchData(data, alias = '') {
    return fetch(`${this._path}${alias}`, {
      method: alias === USER_URL ? 'PATCH' : 'POST',
      headers: this._setHeaders(data.jwt),
      body: JSON.stringify(data.values)
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  recoverPassword(data, alias = '') {
    return fetch(`${this._path}${alias}`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(data)
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

export default userApi;
