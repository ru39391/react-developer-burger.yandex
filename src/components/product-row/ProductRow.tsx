import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProductRow.module.css';

interface IProductRow {
  caption: string;
  img: string;
  counter: string;
};

const ProductRow: FC<IProductRow> = ({ caption, img, counter }) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={img} alt={caption} />
      <div className={`${styles.title} text text_type_main-default`}>{caption}</div>
      <div className={styles.aside}>
        <div className="text text_type_digits-default">{counter}</div>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default ProductRow;
