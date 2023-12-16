import { Location } from 'react-router-dom';

export type TCustomData<T> = {
  [key: string]: T;
};

export type TIngredientPos = 'top' | 'bottom' | undefined;

export type TProductDefault = TCustomData<string | number | TProdData[]> & { pos?: TIngredientPos; };

export type TProductData = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TProduct = TProductData & TProductDefault;

export type TProductDataRes = {
  readonly success: boolean;
  readonly data: TProductData[];
};

export type TOrderData = {
  readonly id: number;
  readonly name: string;
};

export type TOrder = TOrderData & TCustomData<string | number>;

export type TOrderDataRes = {
  readonly success: boolean;
  readonly name: string;
  readonly order: {
    readonly number: number;
  };
};

export type TUserData = {
  readonly name: string;
  readonly email: string;
};

export type TUser = TUserData & TCustomData<boolean>;

export type TAuthResponse = {
  readonly success: boolean;
  readonly user: TUserData;
  readonly message?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
};

export type TPasswordResponse = {
  readonly success: boolean;
  readonly message: string;
};

export type TDraggableData = TCustomData<TProductData>;

export type TDraggableItem = {
  index: number;
  product: TProductData;
};

export type TProdData = {
  name: string;
  value: number;
}

export type TToken = string | undefined | {
  date?: number | undefined;
  token: string | undefined;
};

export type TFieldsData = TCustomData<string> & {
  value: string;
  error: boolean;
  onChange: () => void;
};

export type TLocState = {
  layout: Location;
  item: TProduct;
  prevUrl?: string;
};
