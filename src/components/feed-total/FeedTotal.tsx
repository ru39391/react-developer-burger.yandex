import React, { FC } from 'react';

import styles from './FeedTotal.module.css';

interface IFeedTotal {
  total: string;
  totalToday: string;
}

const FeedTotal: FC<IFeedTotal> = ({ total, totalToday }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className="text text_type_main-medium mb-6">Готовы:</div>
          <ul className={styles.list}>
            {['034533','034532','034530','034527','034525'].map(item => (<li className={`${styles.success} text text_type_digits-default mb-2`} key={item}>{item}</li>))}
          </ul>
        </div>
        <div className={styles.section}>
          <div className="text text_type_main-medium mb-6">В работе:</div>
          <ul className={styles.list}>
            {['034538','034541','034542'].map(item => (<li className="text text_type_digits-default mb-2" key={item}>{item}</li>))}
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
