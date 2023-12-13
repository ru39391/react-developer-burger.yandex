export type TDefaultData = {
  [key: string]: string | number;
};

export type TProductData = TDefaultData & {
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

export type TOrderData = TDefaultData & {
  readonly id: number;
  readonly name: string;
};

export type TUserData = TDefaultData & {
  readonly name: string;
  readonly email: string;
};
