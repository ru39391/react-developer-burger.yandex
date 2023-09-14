import {
  useState,
  useEffect,
  useCallback,
  useReducer
} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

import Modal from '../modal/Modal';
import Ingredient from '../ingredient/Ingredient';
import OrderDetails from '../order-details/OrderDetails';

import Api from '../../utils/api';
import {
  ORDERS_ALIAS,
  ACTION_ERROR_MSG
} from '../../utils/constants';

import OrderContext from '../../services/orderContext';
import { productPropTypes } from '../../utils/proptypes';

const orderInitState = { id: 0, name: 'идентификатор заказа' };

function orderReducer(state, action) {
  const { type, id, name } = action;
  switch (type) {
    case 'set':
      return { id, name };
    case 'reset':
      return { name };
    default:
      throw new Error(`${ACTION_ERROR_MSG}: ${type}`);
  }
}

function BurgerConstructor({
  bunIngredients,
  mainIngredients,
  sauceIngredients,
}) {
  const [summ, setSumm] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [isCheckoutVisible, setCheckoutVisibility] = useState(false);
  const [orderState, orderDispatcher] = useReducer(orderReducer, orderInitState, undefined);

  const api = new Api(ORDERS_ALIAS);
  const [bunTop, bunBottom] = bunIngredients;

  function closeModal() {
    setCheckoutVisibility(false);
  }

  function setOrderDetails(products) {
    const prices = products.map(({ price }) => price);
    setSumm(prices.reduce((summ, item) => summ + item, 0));
    setOrderList(products.map(({ _id }) => _id));
  }

  const checkoutCart = useCallback(
    () => {
      setCheckoutVisibility(true);
      api
        .checkout(orderList)
        .then(({ name, order }) => {
          orderDispatcher({
            type: 'set',
            id: order.number,
            name
          });
        })
        .catch((err) => {
          orderDispatcher({
            type: 'reset',
            name: err
          });
        });
    },
    [orderList]
  );

  useEffect(() => {
    setOrderDetails([
      ...bunIngredients,
      ...mainIngredients,
      ...sauceIngredients
    ]);
  }, [
    bunIngredients,
    mainIngredients,
    sauceIngredients
  ]);

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
            {summ}
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={checkoutCart}>Оформить заказ</Button>
        </div>
      </div>
      {isCheckoutVisible && <Modal isModalOpen={isCheckoutVisible} closeModal={closeModal}><OrderContext.Provider value={orderState}><OrderDetails /></OrderContext.Provider></Modal>}
    </>
  );
}

BurgerConstructor.propTypes = {
  bunIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
  mainIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
  sauceIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired
};

export default BurgerConstructor;
