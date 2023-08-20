import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './BurgerConstructor.css';

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
      <div className="burger-constructor">
        <div className="burger-constructor__wrapper">
          {bunTop && <Ingredient
            type='top'
            isLocked={true}
            text={bunTop.name}
            price={bunTop.price}
            thumbnail={bunTop.image}
          />}
          <div className="burger-constructor__main">
            <div className="burger-constructor__container">
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
        </div>
        <div className="burger-constructor__footer">
          <div className="burger-constructor__meta text text_type_digits-medium">
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
