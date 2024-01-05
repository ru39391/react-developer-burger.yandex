import React, { FC } from 'react';
import ProductRow from '../../components/product-row/ProductRow';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderDetails.module.css';

import { useSelector } from '../../services/hooks';
import type { TRootState } from '../../services/store';

const OrderDetails: FC = () => {
  const ingredients = useSelector((state: TRootState) => state.products.items);
  return (
    <div className={styles.wrapper}>
      <div className="mb-15">
        <div className={`${styles.id} text text_type_digits-default mb-10`}>#034533</div>
        <div className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</div>
        <div className={`${styles.subtitle} text text_type_main-small`}>Выполнен</div>
      </div>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.list}>
            {ingredients.map(item => (<ProductRow key={item._id} picture={item.image_mobile} {...item} />))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className="text text_type_main-default text_color_inactive">Вчера, 13:50</div>
          <div className={styles.total}>
            <div className="text text_type_digits-default">510</div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
