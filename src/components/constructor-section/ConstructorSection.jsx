import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import useModal from '../../hooks/useModal';

import Card from '../card/Card';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

import styles from './ConstructorSection.module.css';

import { productPropTypes } from '../../utils/proptypes';
import { setItemDetails } from '../../services/slices/products-slice';

function ConstructorSection({ data }) {
  const dispatch = useDispatch();
  const { item: cardDetails } = useSelector(state => state.products);
  const {
    isModalVisible,
    setModalVisibility
  } = useModal();

  function closeModal() {
    dispatch(setItemDetails({}));
  }

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
      {isModalVisible && <Modal isModalOpen={isModalVisible} closeModal={closeModal}><IngredientDetails {...cardDetails} /></Modal>}
    </>
  );
}

ConstructorSection.propTypes = {
  data: PropTypes.arrayOf(productPropTypes.isRequired).isRequired
};

export default ConstructorSection;
