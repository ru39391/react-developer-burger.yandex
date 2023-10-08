import React from 'react';
import {
  API_URL,
  RESPONSE_ERROR_MSG
} from './constants';

class userApi extends React.Component {
  constructor(path) {
    super();
    this._path = `${API_URL}${path}/`;
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

  fetchData(data, alias = '') {
    return fetch(`${this._path}${alias}`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(data)
    })
      .then((res) => {return this._checkResponse(res, RESPONSE_ERROR_MSG)});
  }
}

export default userApi;
