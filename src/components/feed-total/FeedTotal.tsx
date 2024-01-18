import React, { FC } from 'react';

import styles from './FeedTotal.module.css';

import { NO_ORDERS } from '../../utils/constants';

interface IFeedTotal {
  total: string;
  totalToday: string;
  ordersDone: string[];
  ordersPending: string[];
}

const FeedTotal: FC<IFeedTotal> = ({
  total,
  totalToday,
  ordersDone,
  ordersPending
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className="text text_type_main-medium mb-6">Готовы:</div>
          <ul className={styles.list}>
            {ordersDone.length
              ? ordersDone.map(item => (<li className={`${styles.success} text text_type_digits-default mb-2`} key={item}>{item}</li>))
              : <li className="text text_type_main-default mb-2">{NO_ORDERS}</li>}
          </ul>
        </div>
        <div className={styles.section}>
          <div className="text text_type_main-medium mb-6">В работе:</div>
          <ul className={styles.list}>
            {ordersPending.length
              ? ordersPending.map(item => (<li className="text text_type_digits-default mb-2" key={item}>{item}</li>))
              : <li className="text text_type_main-default mb-2">{NO_ORDERS}</li>}
          </ul>
        </div>
      </div>
      <div className={styles.section}>
        <div className="text text_type_main-medium">Выполнено за все время:</div>
        <div className={`${styles.total} text text_type_digits-large`}>{total}</div>
      </div>
      <div className={styles.section}>
        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
        <div className={`${styles.total} text text_type_digits-large`}>{totalToday}</div>
      </div>
    </div>
  );
};

export default FeedTotal;
