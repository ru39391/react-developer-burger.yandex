import {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/Modal';
import Ingredient from '../ingredient/Ingredient';
import OrderDetails from '../order-details/OrderDetails';

import styles from './BurgerConstructor.module.css';

import { BUN_PRODUCT_NAME } from '../../utils/constants';
import { checkout } from '../../services/actions';
import {
  addItem,
  addBunItem,
  removeItem,
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

  const removeIngredient = useCallback(
    (item) => {
      dispatch(removeItem({ item }));
    },
    [dispatch]
  );

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
    dispatch(setOrderData());
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
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
          ingredient={buns[0]}
          removeIngredient={removeIngredient}
        />}
        <div className={styles.section}>
          <div className={styles.container}>
            {ingredients.map((item, idx) => (
              <Ingredient
                key={`${idx}${item._id}`}
                text={item.name}
                thumbnail={item.image}
                ingredient={item}
                removeIngredient={removeIngredient}
                {...item}
              />
            ))}
          </div>
        </div>
        {buns[1] && <Ingredient
          type='bottom'
          text={buns[1].name}
          price={buns[1].price}
          thumbnail={buns[1].image}
          ingredient={buns[1]}
          removeIngredient={removeIngredient}
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
