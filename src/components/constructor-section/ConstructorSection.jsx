import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '../card/Card';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

import styles from './ConstructorSection.module.css';

import { productPropTypes } from '../../utils/proptypes';
import { setItemDetails } from '../../services/reducers/products-data';

function ConstructorSection({ data }) {
  const dispatch = useDispatch();
  const { item: cardDetails } = useSelector(state => state.productData);
  const [isCardDetailsVisible, setCardDetailsVisibility] = useState(false);

  function closeModal() {
    dispatch(setItemDetails({}));
  }

  useEffect(
    () => {
      setCardDetailsVisibility(Boolean(Object.values(cardDetails).length));
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
      {isCardDetailsVisible && <Modal isModalOpen={isCardDetailsVisible} closeModal={closeModal}><IngredientDetails {...cardDetails} /></Modal>}
    </>
  );
}

ConstructorSection.propTypes = {
  data: PropTypes.arrayOf(productPropTypes.isRequired).isRequired
};

export default ConstructorSection;
