export type TCustumData<T> = {
  [key: string]: T;
};

export type TDefaultData = TCustumData<string | number | TProdData[]>;

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
  readonly key: string;
};

export type TProduct = TProductData & TDefaultData;

export type TOrderData = {
  readonly id: number;
  readonly name: string;
};

export type TOrder = TOrderData & TDefaultData;

export type TUserData = {
  readonly name: string;
  readonly email: string;
};

export type TUser = TUserData & TDefaultData;

export type TDraggableData = TCustumData<TProductData>;

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

export type TFieldsData = TCustumData<string> & {
  value: string;
  error: boolean;
  onChange: () => void;
};
