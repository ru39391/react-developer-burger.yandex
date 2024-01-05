import React, { FC } from 'react';

import styles from './OrderDetails.module.css';

import { useSelector } from '../../services/hooks';
import type { TRootState } from '../../services/store';

const OrderDetails: FC = () => {
  const ingredients = useSelector((state: TRootState) => state.products.items);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
      </div>
      <div className={styles.list}>
        {ingredients.map(item => (<p key={item._id} className="text text_type_main-default">{item.name}</p>))}
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  );
};

export default OrderDetails;
