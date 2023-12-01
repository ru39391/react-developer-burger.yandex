import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useModal from '../../hooks/useModal';

import Card from '../card/Card';

import styles from './ConstructorSection.module.css';

import { productPropTypes } from '../../utils/proptypes';

function ConstructorSection({ data }) {
  const { item: cardDetails } = useSelector(state => state.products);
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
        {data.map((item) => (
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

ConstructorSection.propTypes = {
  data: PropTypes.arrayOf(productPropTypes.isRequired).isRequired
};

export default ConstructorSection;
