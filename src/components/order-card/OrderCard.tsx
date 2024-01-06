import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderCard.module.css';

import { useSelector } from '../../services/hooks';
import type { TRootState } from '../../services/store';

interface IOrderCard {
  id: string;
  name: string;
  status: string;
  products: string[];
};

const OrderCard: FC<IOrderCard> = ({
  id,
  name,
  status,
  products
}) => {
  const ingredients = useSelector((state: TRootState) => state.products.items);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className="text text_type_digits-default">#{id}</div>
        <div className="text text_type_main-default text_color_inactive">Сегодня, 16:20</div>
      </div>
      <div className={styles.header}>
        <div className="text text_type_main-medium">{name}</div>
        <div className={`${styles.subtitle} text text_type_main-default`}>Выполнен</div>
      </div>
      <div className={styles.container}>
        <div className={styles.list}>
          {products.map((item, index) => (item && <div key={index} className={styles.picholder}><img className={styles.img} src={item} alt={item} /><div className={`${styles.counter} text text_type_main-default`}>+3</div></div>))}
        </div>
        <div className={styles.total}>
          <div className="text text_type_digits-default">510</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
