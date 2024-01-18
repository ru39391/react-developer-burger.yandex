import React, { FC, useEffect } from 'react';

import useModal from '../../hooks/useModal';

import Card from '../card/Card';

import styles from './ConstructorSection.module.css';

import { useSelector } from '../../services/hooks';
import type { TRootState } from '../../services/store';
import type { TProduct } from '../../types';

interface IConstructorSection {
  data: TProduct[];
};

const ConstructorSection: FC<IConstructorSection> = ({ data }) => {
  const { item: cardDetails } = useSelector((state: TRootState) => state.products);
  const { setModalVisibility } = useModal();

  useEffect(
    () => {
      setModalVisibility(Boolean(Object.values(cardDetails).length));
    },
    [cardDetails]
  );

  return (
    <>
      <div className={`${styles.wrapper} pr-4 pl-4 mb-10`}>
        {data.map(item => (
          <Card
            key={item._id}
            data={item}
            thumbnail={item.image}
            picture={item.image_large}
            nutritional={[
              item.calories,
              item.proteins,
              item.fat,
              item.carbohydrates
            ]}
            {...item}
          />
        ))}
      </div>
    </>
  );
}

export default ConstructorSection;
