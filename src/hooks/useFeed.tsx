import { useCallback, useState, useEffect } from 'react';

import type { TCustomData, TFeedOrder, TFeedData } from '../types';

interface IFeedHook {
  isSucceed: boolean;
  totalData: TCustomData<string>;
  feedOrders: TFeedOrder[];
  handleFeed: (data: TFeedData) => void;
}

const useFeed = (): IFeedHook => {
  const [isSucceed, setSucceed] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<TCustomData<string>>({});
  const [feedOrders, setFeedOrders] = useState<TFeedOrder[]>([]);

  const handleFeed = (data: TFeedData) => {
    const {
      success,
      orders,
      total,
      totalToday,
    } = data;
    setSucceed(success);
    setTotalData({
      total: total.toString(),
      totalToday: totalToday.toString()
    });
    setFeedOrders([...orders]);

    console.log(total, totalToday);
    console.log(totalData);
  };

  return {
    isSucceed,
    totalData,
    feedOrders,
    handleFeed
  };
};

export default useFeed;
