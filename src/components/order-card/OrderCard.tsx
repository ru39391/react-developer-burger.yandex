import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderCard.module.css';

import { ORDER_STATES } from '../../utils/constants';
import useOrderData from '../../hooks/useOrderData';

interface IOrderCard {
  id: string;
  name: string;
  status: string;
  products: string[];
  date: string;
};

const OrderCard: FC<IOrderCard> = ({
  id,
  name,
  status,
  products,
  date
}) => {
  const { summ, orderProducts } = useOrderData(products);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className="text text_type_digits-default">#{id}</div>
        <div className="text text_type_main-default text_color_inactive">{date}</div>
      </div>
      <div className={styles.header}>
        <div className="text text_type_main-medium">{name}</div>
        <div className={`${styles.subtitle} text text_type_main-default`}>{ORDER_STATES[status]}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.list}>
          {orderProducts.length && orderProducts.map(({
              img,
              caption,
              counter
            }, index) => (
              <div key={index} className={styles.picholder}>
                <img className={styles.img} src={img as string} alt={caption as string} title={caption as string} />
                {counter && <div className={`${styles.counter} text text_type_main-default`}>+{counter.toString()}</div>}
              </div>
          ))}
        </div>
        <div className={styles.total}>
          <div className="text text_type_digits-default">{summ}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
