import {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/Modal';
import Ingredient from '../ingredient/Ingredient';
import OrderDetails from '../order-details/OrderDetails';

import styles from './BurgerConstructor.module.css';

import {
  ID_KEY,
  PRICE_KEY,
  BUN_PRODUCT_NAME
} from '../../utils/constants';

import { checkout } from '../../services/actions';
import {
  addItem,
  addBunItem,
  setOrderData
} from '../../services/reducers/order-data';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const {
    bunItems: buns,
    mainItems: ingredients,
    orderList,
    summ
  } = useSelector(state => state.orderData);
  const [isCheckoutVisible, setCheckoutVisibility] = useState(false);

  function closeModal() {
    setCheckoutVisibility(false);
  }

  const checkoutCart = useCallback(
    () => {
      setCheckoutVisibility(true);
      dispatch(checkout(orderList));
    },
    [
      orderList,
      dispatch
    ]
  );

  const [{ isHover }, wrapperRef] = useDrop({
    accept: 'order',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      item.type === BUN_PRODUCT_NAME ? dispatch(addBunItem({ item })) : dispatch(addItem({ item }));
    },
  });

  useEffect(() => {
    dispatch(setOrderData({ idKey: ID_KEY, priceKey: PRICE_KEY }));
  }, [
    buns,
    ingredients,
    dispatch
  ]);

  return (
    <>
      <div className={`${styles.wrapper} ${isHover && styles.wrapper_hovered}`} ref={wrapperRef}>
        {buns[0] && <Ingredient
          type='top'
          isLocked={true}
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
        />}
        <div className={styles.section}>
          <div className={styles.container}>
            {ingredients.map(({
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
        {buns[1] && <Ingredient
          type='bottom'
          isLocked={true}
          text={buns[1].name}
          price={buns[1].price}
          thumbnail={buns[1].image}
        />}
        {Boolean(summ) && (
          <div className={`${styles.footer} mt-4`}>
            <div className={`${styles.meta} text text_type_digits-medium`}>
              {summ}
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={checkoutCart}>Оформить заказ</Button>
          </div>
        )}
      </div>
      {isCheckoutVisible && <Modal isModalOpen={isCheckoutVisible} closeModal={closeModal}><OrderDetails /></Modal>}
    </>
  );
}

export default BurgerConstructor;
