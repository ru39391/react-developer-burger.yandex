import { useState } from 'react';

import { DONE_STATE, PENDING_STATE } from '../utils/constants';
import type { TCustomData, TFeedOrder, TFeedData } from '../types';

interface IFeedHook {
  isSucceed: boolean;
  isFailed: boolean;
  totalData: TCustomData<string>;
  feedOrders: TFeedOrder[];
  feedOrdersDone: string[];
  feedOrdersPending: string[];
  handleFeed: (data: TFeedData) => void;
}

const useFeed = (): IFeedHook => {
  const [isSucceed, setSucceed] = useState<boolean>(false);
  const [isFailed, setFailed] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<TCustomData<string>>({});
  const [feedOrders, setFeedOrders] = useState<TFeedOrder[]>([]);
  const [feedOrdersDone, setFeedOrdersDone] = useState<string[]>([]);
  const [feedOrdersPending, setFeedOrdersPending] = useState<string[]>([]);

  const handleTime = (value: number): string => `0${value.toString()}`.slice(-2);

  const handleDate = (date: Date): number[] => [date.getDate(), date.getMonth(), date.getFullYear()];

  const formatDate = (value: string): string => {
    const date = new Date(value);
    const currentDate = new Date();
    const dateArr = handleDate(date);
    const currentDateArr = handleDate(currentDate);

    const matchesArr = dateArr.reduce((acc: number[], item, index) => item === currentDateArr[index] ? [...acc, item] : acc, []);
    const formattedDate = `${[date.getDate(), date.getMonth() + 1].map(item => handleTime(item)).join('.')}.${date.getFullYear()}`;
    const formattedTime = [date.getHours(), date.getMinutes()].map(item => handleTime(item)).join(':');

    return matchesArr.length === 3 ? `Сегодня, ${formattedTime}` : `${formattedDate}, ${formattedTime}`;
  };

  const filterOrders = (arr: TFeedOrder[], state: string): string[] => [...arr].filter(({ status }) => status === state).map(({ number }) => number.toString());

  const handleFeed = (data: TFeedData) => {
    const {
      success,
      orders,
      total,
      totalToday,
    } = data;
    setSucceed(success);
    setFailed(!success);
    setTotalData({
      total: total.toString(),
      totalToday: totalToday.toString()
    });
    setFeedOrders(
      [...orders].map(
        item => ({
          ...item,
          updatedAt: formatDate(item.updatedAt),
          number: item.number.toString()
        })
      )
    );
    setFeedOrdersDone(filterOrders(orders, DONE_STATE));
    setFeedOrdersPending(filterOrders(orders, PENDING_STATE));

    console.log(total, totalToday);
    console.log(totalData);
  };

  return {
    isSucceed,
    isFailed,
    totalData,
    feedOrders,
    feedOrdersDone,
    feedOrdersPending,
    handleFeed,
  };
};

export default useFeed;
