import { Component } from 'react';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from './constants';

import type { TCustomData, TToken } from '../types';

class StorageApi extends Component<{}> {
  private _storage: Storage;

  constructor() {
    super({});
    this._storage = localStorage;
  }

  private _setCurrDate(): number {
    const currDate: Date = new Date();
    return currDate.getTime();
  };

  public setStorageItem(key: string, value: string | boolean): void {
    const bool: string | number = typeof value === 'boolean' && value ? 1 : '';
    this._storage.setItem(key, typeof value !== 'boolean' ? value : bool.toString());
  };

  public removeStorageItem(key: string): void {
    this._storage.removeItem(key);
  };

  public getStorageItem(key: string, isTokenKey: boolean = true): TToken {
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

  public isItemExist(key: string, isTokenKey: boolean = true): boolean {
    const data: TToken = typeof this.getStorageItem(key) !== 'string' && Boolean(this.getStorageItem(key))
      ? this.getStorageItem(key)
      : null;
    const token: string | null = typeof data === 'object' && data !== null ? data.token : null;
    return isTokenKey ? Boolean(token) : Boolean(this.getStorageItem(key, false));
  };

  public isTokenExpired(): boolean {
    const accessToken: TToken = typeof this.getStorageItem(ACCESS_TOKEN_KEY) !== 'string' && Boolean(this.getStorageItem(ACCESS_TOKEN_KEY))
      ? this.getStorageItem(ACCESS_TOKEN_KEY)
      : null;
    const date: number | null | undefined = typeof accessToken === 'object' && accessToken !== null ? accessToken.date : 0;
    return date ? this._setCurrDate() - date > 20 * 60 * 1000 : false;
  };

  public clearStorage(): void | boolean {
    return this.isItemExist(ACCESS_TOKEN_KEY) && this.isItemExist(REFRESH_TOKEN_KEY)
      ? [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach((key: string) => this.removeStorageItem(key))
      : true;
  };

  public setCurrTokens({ accessToken, refreshToken }: TCustomData<string>): void {
    const jwt: string = accessToken.split('Bearer ')[1];
    const data: TCustomData<string> = {
      accessToken: [this._setCurrDate(),jwt].toString(),
      refreshToken
    };

    if(this.clearStorage()) {
      Object.keys(data).forEach((key: string, index: number) => {
        this.setStorageItem(key, Object.values(data)[index])
      });
    }
  };
};

const storage = new StorageApi();

export default storage;
