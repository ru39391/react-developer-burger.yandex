import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import useModal from '../../hooks/useModal';
import useProdData from '../../hooks/useProdData';

import Card from '../card/Card';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

import styles from './ConstructorSection.module.css';

import { productPropTypes } from '../../utils/proptypes';
import { setItemDetails } from '../../services/slices/products-slice';

function ConstructorSection({ data }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, item: cardDetails } = useSelector(state => state.products);
  const {
    isModalVisible,
    setModalVisibility
  } = useModal();
  const { handleProdData } = useProdData();

  function closeModal() {
    dispatch(setItemDetails({}));
    navigate(`/`, { replace: true });
  }

  function showModal() {
    const pathNameArr = location.pathname.split('/');
    const item = pathNameArr.length > 2 ? items.find(({ _id }) => _id === pathNameArr[pathNameArr.length - 1]) : null;
    if(item) {
      dispatch(setItemDetails({
        ...item,
        image: item ? item.image_large : '',
        nutritional: handleProdData([
          item ? item.calories : 0,
          item ? item.proteins : 0,
          item ? item.fat : 0,
          item ? item.carbohydrates : 0
        ])
      }));
    };
  }

  useEffect(
    () => {
      setModalVisibility(Boolean(Object.values(cardDetails).length));
    },
    [cardDetails]
  );

  useEffect(
    () => {
      showModal();
      console.log(location);
    },
    [location]
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
