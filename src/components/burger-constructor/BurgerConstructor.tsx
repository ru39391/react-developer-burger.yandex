import React, { FC, Key, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

import Modal from '../modal/Modal';
import Ingredient from '../ingredient/Ingredient';
import OrderAlert from '../order-alert/OrderAlert';

import styles from './BurgerConstructor.module.css';

import {
  TOP_KEY,
  BOTTOM_KEY,
  LOGIN_URL,
  BUN_PRODUCT_NAME
} from '../../utils/constants';
import { checkout } from '../../services/actions/order';
import {
  addItem,
  addBunItem,
  removeItem,
  setOrderData,
  updateOrderList
} from '../../services/slices/order-slice';

import { useSelector, useDispatch } from '../../services/hooks';
import type { TRootState } from '../../services/store';
import type { TProductData, TDraggableData, TDraggableItem } from '../../types';

const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    bunItems: buns,
    mainItems: ingredients,
    orderList,
    summ
  } = useSelector((state: TRootState) => state.order);
  const { isLogged, accessToken } = useAuth();
  const {
    isModalVisible,
    setModalVisibility
  } = useModal();

  const removeIngredient = useCallback(
    (item: TProductData) => {
      dispatch(removeItem({ index: ingredients.indexOf(item) }));
    },
    [
      ingredients,
      dispatch
    ]
  );

  const handleDrop = useCallback(
    (data: TDraggableData) => {
      const isBunItemsArr: boolean[] = Object.values(data).map(({ type }) => type === BUN_PRODUCT_NAME);
      const getIndex = (value: number): TDraggableItem => ({
        product: Object.values(data)[value],
        index: ingredients.indexOf(Object.values(data)[value])
      });

      if(isBunItemsArr.some((item: boolean) => item)) {
        return;
      } else {
        dispatch(updateOrderList({ items: { draggedItem: getIndex(0), targetItem: getIndex(1) } }));
      }
    },
    [
      ingredients,
      dispatch
    ]
  );

  const checkoutCart = useCallback(
    () => {
      if(isLogged) {
        setModalVisibility(true);
        dispatch(checkout(accessToken as string, orderList));
      } else {
        navigate(`/${LOGIN_URL}`, { replace: false });
      }
    },
    [
      isLogged,
      orderList,
      dispatch
    ]
  );

  const [{ isHover }, wrapperRef] = useDrop({
    accept: 'card',
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver()
    }),
    drop: (item: TProductData) => {
      item.type === BUN_PRODUCT_NAME ? dispatch(addBunItem({ item })) : dispatch(addItem({ item }));
    },
  });

  useEffect(() => {
    dispatch(setOrderData({}));
  }, [
    buns,
    ingredients,
    dispatch
  ]);

  return (
    <>
      <div className={`${styles.wrapper} ${isHover && styles.wrapper_hovered}`} ref={wrapperRef}>
        {buns[0] && <Ingredient
          pos={TOP_KEY}
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
          ingredient={buns[0]}
          handleDrop={handleDrop}
          removeIngredient={removeIngredient}
        />}
        <div className={styles.section}>
          <div className={styles.container}>
            {ingredients.map(item => (
              <Ingredient
                {...item}
                key={item.key as Key}
                text={item.name}
                thumbnail={item.image}
                ingredient={item}
                handleDrop={handleDrop}
                removeIngredient={removeIngredient}
              />
            ))}
          </div>
        </div>
        {buns[1] && <Ingredient
          pos={BOTTOM_KEY}
          text={buns[1].name}
          price={buns[1].price}
          thumbnail={buns[1].image}
          ingredient={buns[1]}
          handleDrop={handleDrop}
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
      {isModalVisible && <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}><OrderAlert /></Modal>}
    </>
  );
}

export default BurgerConstructor;
