import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

import Modal from '../modal/Modal';
import Ingredient from '../ingredient/Ingredient';
import OrderDetails from '../order-details/OrderDetails';

import { productPropTypes } from '../../utils/proptypes';

function BurgerConstructor({
  bunIngredients,
  mainIngredients,
  sauceIngredients,
}) {
  const [isCheckoutVisible, setCheckoutVisibility] = useState(false);

  const [bunTop, bunBottom] = bunIngredients;

  function closeModal() {
    setCheckoutVisibility(false);
  }

  return (
    <>
      <div className={styles.wrapper}>
        {bunTop && <Ingredient
          type='top'
          isLocked={true}
          text={bunTop.name}
          price={bunTop.price}
          thumbnail={bunTop.image}
        />}
        <div className={styles.section}>
          <div className={styles.container}>
            {[...mainIngredients, ...sauceIngredients].map(({
              _id,
              type,
              name,
              price,
              image,
            }) => (
              <Ingredient
                key={_id}
                type={type}
                isLocked={true}
                text={name}
                price={price}
                thumbnail={image}
              />
            ))}
          </div>
        </div>
        {bunBottom && <Ingredient
          type='bottom'
          isLocked={true}
          text={bunBottom.name}
          price={bunBottom.price}
          thumbnail={bunBottom.image}
        />}
        <div className={`${styles.footer} mt-4`}>
          <div className={`${styles.meta} text text_type_digits-medium`}>
            610
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => setCheckoutVisibility(true)}>Оформить заказ</Button>
        </div>
      </div>
      {isCheckoutVisible && <Modal isModalOpen={isCheckoutVisible} closeModal={closeModal}><OrderDetails /></Modal>}
    </>
  );
}

BurgerConstructor.propTypes = {
  bunIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
  mainIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
  sauceIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired
};

export default BurgerConstructor;
