import { useState } from 'react';

import useFeed from './useFeed';
import useOrderData from './useOrderData';
import orderApi from '../utils/orderApi';

import type { TFeedOrder, TProductDefault } from '../types';

interface IOrderDetailsHook {
  summ: string;
  isFailed: boolean;
  orderProducts: TProductDefault[];
  currentOrder: TFeedOrder | null;
  fetchOrderDetails: (id: string) => void;
}

const useOrderDetails = (): IOrderDetailsHook => {
  const [summ, setSumm] = useState<string>('');
  const [isFailed, setFailed] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<TFeedOrder | null>(null);
  const [orderProducts, setOrderProducts] = useState<TProductDefault[]>([]);

  const { handleFeed } = useFeed();
  const { handleProductsList } = useOrderData();

  const fetchOrderDetails = async (id: string) => {
    try {
      const data = await orderApi.getOrderData(id);
      const isSucceed = data.success && data.orders.length;
      const [orderData] = handleFeed(data);
      const { totalSumm, products } = isSucceed ? handleProductsList(orderData.ingredients) : { totalSumm: 0, products: [] };

      if(isSucceed) {
        setCurrentOrder(orderData);
        setOrderProducts(products.reduce((acc: TProductDefault[], item: TProductDefault) => {
          if(acc.find((product) => product._id === item._id)) {
            return acc;
          }
          return [...acc, item];
        }, []));
        setSumm(totalSumm.toString());
      } else {
        setFailed(true);
        return;
      }
    } catch (error) {
      setFailed(true);
      console.error(error);
    }
  };

  return {
    summ,
    isFailed,
    orderProducts,
    currentOrder,
    fetchOrderDetails
  };
};

export default useOrderDetails;
