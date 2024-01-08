import React, { FC } from 'react';
import Preloader from '../preloader/Preloader';
import CheckoutImg from '../../images/checkout.png';

import styles from './OrderAlert.module.css';

import { useSelector } from '../../services/hooks';
import type { TRootState } from '../../services/store';

const OrderAlert: FC = () => {
  const {
    orderRequest: isLoading,
    order: { id, name },
    errorMsg
  } = useSelector((state: TRootState) => state.order);
  const caption = typeof name === 'string' ? name : '';

  return (
    <>
      {isLoading
        ? <Preloader />
        : (
          <div className={`${styles.wrapper} pt-20 pb-20`}>
            {id ? (
              <>
                <div className="mb-15">
                  <div className={`${styles.id} text text_type_digits-large mb-8`}>{id.toString()}</div>
                  <div className="text text_type_main-medium">{caption}</div>
                </div>
                <img src={CheckoutImg} alt="Ваш заказ начали готовить" />
                <div className="mt-15">
                  <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
                  <div className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</div>
                </div>
              </>
            ) : <div className="text text_type_main-medium">{errorMsg}</div>}
          </div>
        )}
    </>
  );
}

export default OrderAlert;
