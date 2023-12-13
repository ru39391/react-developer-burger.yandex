import React, { FC } from 'react';
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

  setStorageItem(key, value) {
    const bool = typeof value === 'boolean' && value ? 1 : '';
    this._storage.setItem(key, typeof value !== 'boolean' ? value : bool);
  };

  removeStorageItem(key) {
    this._storage.removeItem(key);
  };

  getStorageItem(key, isTokenKey = true) {
    const value = this._storage.getItem(key);
    if(isTokenKey) {
      return key === ACCESS_TOKEN_KEY
        ? {
          date: value ? Number(value.split(',')[0]) : null,
          token: value ? value.split(',')[1] : null
        }
        : { token: value };
    }
    return value;
  };

  isItemExist(key, isTokenKey = true) {
    return isTokenKey ? Boolean(this.getStorageItem(key).token) : Boolean(this.getStorageItem(key, false));
  };

  isTokenExpired() {
    return this._setCurrDate() - this.getStorageItem(ACCESS_TOKEN_KEY).date > 20 * 60 * 1000;
  };

  clearStorage() {
    return this.isItemExist(ACCESS_TOKEN_KEY) && this.isItemExist(REFRESH_TOKEN_KEY)
      ? [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach(key => this.removeStorageItem(key))
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
        this.setStorageItem(key, Object.values(data)[index])
      });
    }
  };
};

const storage = new Storage();

export default storage;
