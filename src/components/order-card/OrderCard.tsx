import React, { FC, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderCard.module.css';

import { FEED_URL, PROFILE_URL, ORDERS_URL, ORDER_STATES } from '../../utils/constants';
import useOrderData from '../../hooks/useOrderData';

interface IOrderCard {
  id: number;
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
  const location = useLocation();
  const navigate = useNavigate();
  const {
    summ,
    orderProducts,
    handleProductsList
  } = useOrderData();
  const currentUrl = location.pathname.split('/').includes(PROFILE_URL) ? location.pathname.replace('/','') : FEED_URL;

  const handleOrderCardData = useCallback(
    () => {
      navigate(`/${currentUrl}/${id.toString()}`, {
        replace: true,
        state: {
          layout: location,
          path: location.pathname,
          item: {
            id: id.toString()
          }
        }
      });
    }, [id]
  );

  useEffect(() => {
    handleProductsList(products);
  }, [products]);

  return (
    <div className={styles.wrapper} onClick={handleOrderCardData}>
      <div className={styles.container}>
        <div className="text text_type_digits-default">#{id.toString()}</div>
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
              hidden
            }, index) => (
              <div key={index} className={styles.picholder}>
                <img className={styles.img} src={img as string} alt={caption as string} title={caption as string} />
                {hidden && <div className={`${styles.counter} text text_type_main-default`}>+{hidden.toString()}</div>}
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
