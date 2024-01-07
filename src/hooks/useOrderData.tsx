import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';
import type { TRootState } from '../services/store';

import type { TProductDefault, TProductData } from '../types';

interface IOrderDataHook {
  summ: number;
  orderProducts: TProductDefault[];
}

const useOrderData = (products: string[]): IOrderDataHook => {
  const [summ, setSumm] = useState<number>(0);
  const [orderProducts, setOrderProducts] = useState<TProductDefault[]>([]);

  const ingredients = useSelector((state: TRootState) => state.products.items);

  const handleProductsList = () => {
    const productsArr: TProductData[] = products.map(item => ingredients.find(({ _id }) => _id === item) as TProductData);
    const productsList: TProductDefault[] = productsArr.map(
      (
        {
          _id,
          name,
          image_mobile
        },
        _,
        arr
      ) => (
        {
          _id,
          caption: name,
          img: image_mobile,
          counter: arr.length > 6 ? arr.length - 6 : 0
        }
      )
    );

    setSumm(productsArr.reduce((acc, item) => acc + item.price, 0));
    setOrderProducts(productsList.length > 6 ? productsList.filter((_, index) => index < 6) : productsList);
  };

  useEffect(() => {
    handleProductsList();
  }, [products]);

  return {
    summ,
    orderProducts
  };
};

export default useOrderData;
