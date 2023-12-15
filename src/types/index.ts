import { Location } from 'react-router-dom';

export type TCustomData<T> = {
  [key: string]: T;
};

export type TDefaultData = TCustomData<string | number | TProdData[]>;

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

export type TProduct = TProductData & TDefaultData;

export type TProductDataRes = {
  readonly success: boolean;
  readonly data: TProductData[];
};

export type TOrderData = {
  readonly id: number;
  readonly name: string;
};

export type TOrder = TOrderData & TDefaultData;

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

export type TUser = TUserData & TDefaultData;

export type TDraggableData = TCustomData<TProductData>;

export type TDraggableItem = {
  index: number;
  product: TProductData;
};

export type TProdData = {
  name: string;
  value: number;
}

export type TToken = string | null | {
  date?: number | null;
  token: string | null;
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
