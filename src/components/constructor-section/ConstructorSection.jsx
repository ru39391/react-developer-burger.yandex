import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '../card/Card';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import styles from './ConstructorSection.module.css';

import { setItemDetails } from '../../services/reducers/products-data';
import { productPropTypes } from '../../utils/proptypes';

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
        {data.map(({
          _id,
          name,
          price,
          image,
          image_large,
          calories,
          proteins,
          fat,
          carbohydrates
        }) => (
          <Card
            key={_id}
            name={name}
            price={price.toString()}
            thumbnail={image}
            image={image_large}
            nutritional={[
              calories,
              proteins,
              fat,
              carbohydrates
            ]}
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
