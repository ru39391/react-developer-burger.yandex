import React, { FC, Key, useEffect } from 'react';

import Preloader from '../preloader/Preloader';
import ProductRow from '../product-row/ProductRow';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderDetails.module.css';

import { ORDER_STATES } from '../../utils/constants';

import useOrderDetails from '../../hooks/useOrderDetails';

interface IOrderDetails {
  id: string | undefined;
  onFailed?: Function;
};

const OrderDetails: FC<IOrderDetails> = ({ id, onFailed }) => {
  const {
    summ,
    isFailed,
    orderProducts,
    currentOrder,
    fetchOrderDetails
  } = useOrderDetails();

  useEffect(() => {
    if(typeof onFailed === 'function') {
      onFailed(isFailed);
    }
  }, [isFailed]);

  useEffect(() => {
    if(typeof id === 'string') {
      fetchOrderDetails(id as string);
    }
  }, [summ]);

  return (
    <>
      {currentOrder ? (
        <div className={styles.wrapper}>
          <div className="mb-15">
            <div className={`${styles.id} text text_type_digits-default mb-10`}>#{id}</div>
            <div className="text text_type_main-medium mb-3">{currentOrder.name}</div>
            <div className={`${styles[currentOrder.status]} text text_type_main-small`}>{ORDER_STATES[currentOrder.status]}</div>
          </div>
          <div className={styles.container}>
            <div className={styles.section}>
              <div className={styles.list}>
                {orderProducts.length && orderProducts.map(({
                    _id,
                    caption,
                    img,
                    price,
                    counter
                  }) => (
                    <ProductRow
                      key={_id as Key}
                      caption={caption as string}
                      img={img as string}
                      counter={`${counter.toString()} x ${price.toString()}`}
                    />
                ))}
              </div>
            </div>
            <div className={styles.footer}>
              <div className="text text_type_main-default text_color_inactive">{currentOrder.updatedAt}</div>
              <div className={styles.total}>
                <div className="text text_type_digits-default">{summ}</div>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default OrderDetails;
