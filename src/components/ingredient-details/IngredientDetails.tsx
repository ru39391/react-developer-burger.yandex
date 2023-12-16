import React, { FC, memo } from 'react';

import styles from './IngredientDetails.module.css';

import type { TProdData } from '../../types';

interface IIngredientDetails {
  name: string | number | TProdData[];
  image: string | number | TProdData[];
  nutritional: TProdData[];
  isCurrentPage?: boolean;
}

const IngredientDetails: FC<IIngredientDetails> = ({
  name,
  image,
  nutritional,
  isCurrentPage
}) => {
  const nameVal = typeof name === 'string' ? name.toString() : '';
  const imageVal = typeof image === 'string' ? image.toString() : '';

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.title} ${isCurrentPage ? 'mb-5' : `${styles.title_as_fs} pr-15`} text text_type_main-large`}>Детали ингредиента</div>
      <img className="mb-4" src={imageVal} alt={nameVal} />
      <div className={`${styles.subtitle} text text_type_main-medium mb-8`}>{nameVal}</div>
      <div className={`${styles.row} mb-5`}>
        {nutritional && nutritional.map(({
          name,
          value
        }, index) => (
          <div key={index} className={`${styles.info} text text_type_digits-default text_color_inactive`}>
            <div className="text text_type_main-default">{name}</div>
            {value.toString()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(IngredientDetails);
