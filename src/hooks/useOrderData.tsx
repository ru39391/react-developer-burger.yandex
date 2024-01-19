import { useState } from 'react';

import { useSelector } from '../services/hooks';
import type { TRootState } from '../services/store';

import type { TProductDefault, TProductData } from '../types';

type TProductsList = {
  totalSumm: number;
  products: TProductDefault[]
};

interface IOrderDataHook {
  summ: string;
  orderProducts: TProductDefault[];
  handleProductsList: (products: string[]) => TProductsList;
}

const useOrderData = (): IOrderDataHook => {
  const [summ, setSumm] = useState<string>('');
  const [orderProducts, setOrderProducts] = useState<TProductDefault[]>([]);

  const ingredients = useSelector((state: TRootState) => state.products.items);

  const handleProductsList = (products: string[]): TProductsList => {
    const productsArr: TProductData[] = products.map(item => ingredients.find(({ _id }) => _id === item) as TProductData);
    const totalSumm = productsArr.reduce((acc, item) => item ? acc + item.price : acc, 0);
    const productsList: TProductDefault[] = productsArr.map((item, _, arr) => (
      {
        _id: item ? item._id : '',
        caption: item ? item.name : '',
        price: item ? item.price : 0,
        img: item ? item.image_mobile : '',
        counter: item ? arr.filter(product => product ? product._id === item._id : []).length : [],
        hidden: arr.length > 6 ? arr.length - 6 : 0
      }
    ));

    setSumm(totalSumm.toString());
    setOrderProducts(productsList.length > 6 ? productsList.filter((_, index) => index < 6) : productsList);

    return {
      totalSumm,
      products: productsList
    };
  };

  return {
    summ,
    orderProducts,
    handleProductsList
  };
};

export default useOrderData;
