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
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.title} ${isCurrentPage ? 'mb-5' : `${styles.title_as_fs} pr-15`} text text_type_main-large`}>Детали ингредиента</div>
      <img className="mb-4" src={image.toString()} alt={name.toString()} />
      <div className={`${styles.subtitle} text text_type_main-medium mb-8`}>{name.toString()}</div>
      <div className={`${styles.row} mb-5`}>
        {nutritional && nutritional.map(({
          name,
          value
        }, index: number) => (
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
