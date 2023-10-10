import React from 'react';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from './constants';

class Storage extends React.Component {
  constructor() {
    super();
    this._storage = localStorage;
  }

  _setCurrDate() {
    const currDate = new Date();
    return currDate.getTime();
  };

  _setToken(key, value) {
    this._storage.setItem(key, value);
  };

  _removeToken(key) {
    this._storage.removeItem(key);
  };

  getToken(key) {
    const value = this._storage.getItem(key);
    return key === ACCESS_TOKEN_KEY
      ? {
        date: value ? Number(value.split(',')[0]) : null,
        token: value ? value.split(',')[1] : null
      }
      : { token: value };
  };

  isTokenExist(key) {
    return Boolean(this.getToken(key).token);
  };

  isTokenExpired() {
    return this._setCurrDate() - this.getToken(ACCESS_TOKEN_KEY).date > 20 * 60 * 1000;
  };

  clearStorage() {
    return this.isTokenExist(ACCESS_TOKEN_KEY) && this.isTokenExist(REFRESH_TOKEN_KEY)
      ? [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach(key => this._removeToken(key))
      : true;
  };

  setCurrTokens({ accessToken, refreshToken }) {
    const jwt = accessToken.split('Bearer ')[1];
    const data = {
      accessToken: [this._setCurrDate(),jwt].toString(),
      refreshToken
    };

    if(this.clearStorage()) {
      Object.keys(data).forEach((key, index) => {
        this._setToken(key, Object.values(data)[index])
      });
    }
  };
};

const storage = new Storage();

export default storage;
