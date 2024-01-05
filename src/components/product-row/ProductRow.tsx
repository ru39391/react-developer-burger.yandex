import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProductRow.module.css';

interface IProductRow {
  name: string;
  picture: string;
};

const ProductRow: FC<IProductRow> = ({ name, picture }) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={picture} alt={name} />
      <div className={`${styles.title} text text_type_main-default`}>{name}</div>
      <div className={styles.aside}>
        <div className="text text_type_digits-default">2 x 20</div>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default ProductRow;
