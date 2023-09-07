import React from 'react';
import {
  API_URL,
  RESPONSE_ERROR_MSG
} from './constants';

class Api extends React.Component {
  constructor(path) {
    super();
    this._path = path;
  }

  _setHeaders() {
    return {
      'Content-Type': 'application/json'
    }
  }

  _checkResponse(result, resultAlert) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  getData() {
    return fetch(`${API_URL}${this._path}`, {
      headers: this._setHeaders()
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }

  checkout(idsArr) {
    return fetch(`${API_URL}${this._path}`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({
        ingredients: idsArr
      })
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

export default Api;
