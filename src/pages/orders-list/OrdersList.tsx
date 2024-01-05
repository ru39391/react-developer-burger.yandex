import React, { FC } from 'react';
import OrderCard from '../../components/order-card/OrderCard';

import styles from '../../components/feed-list/FeedList.module.css';

const OrdersList: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section}>
          {[
            'Death Star Starship Main бургер',
            'Interstellar бургер',
            'Black Hole Singularity острый бургер',
            'Supernova Infinity бургер',
            'Death Star Starship Main бургер',
            'Interstellar бургер',
            'Black Hole Singularity острый бургер',
            'Supernova Infinity бургер',
            'Death Star Starship Main бургер',
            'Interstellar бургер',
            'Black Hole Singularity острый бургер',
            'Supernova Infinity бургер',
          ].map((item, index) => (<OrderCard key={index} name={item} />))}
        </div>
      </div>
    </div>
  )
};

export default OrdersList;
