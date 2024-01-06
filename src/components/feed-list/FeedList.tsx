import React, { FC } from 'react';
import OrderCard from '../../components/order-card/OrderCard';

import styles from './FeedList.module.css';

import type { TFeedOrder } from '../../types';

interface IFeedList {
  orders: TFeedOrder[];
}

const FeedList: FC<IFeedList> = ({ orders }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section}>
          {orders.length && orders.map(({
              _id,
              ingredients,
              status,
              name,
              number
            }) => (
              <OrderCard
                key={_id}
                id={number.toString()}
                name={name}
                status={status}
                products={ingredients}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedList;
