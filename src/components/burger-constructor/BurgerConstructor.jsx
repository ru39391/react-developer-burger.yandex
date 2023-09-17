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

import { BUN_PRODUCT_NAME } from '../../utils/constants';

import { checkout } from '../../services/actions';
import { addItem, replaceItem } from '../../services/reducers/order-data';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { items: ingredients } = useSelector(state => state.orderData);

  const [summ, setSumm] = useState(0);
  const [buns, setBuns] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [isCheckoutVisible, setCheckoutVisibility] = useState(false);

  function setOrderDetails() {
    /*
    const currIngredients = ingredients.filter(({ _id }) => currItems.map(({ id }) => id).includes(_id));
    const bunIngredient = currIngredients.find(product => product.type === BUN_PRODUCT_NAME);
    const mainIngredients = currIngredients.filter(product => product.type !== BUN_PRODUCT_NAME);

    const buns = [...Array(2)].map((_) => bun);

    currIngredients.splice(currIngredients.indexOf(bun), 1);
    //const prices = products.map(({ price }) => price);
    //setSumm(prices.reduce((summ, item) => summ + item, 0));
    setBuns(buns);
    setOrderList([...buns, ...mainIngredients].map(({ _id }) => _id));
    */
  }

  function closeModal() {
    setCheckoutVisibility(false);
  }

  const checkoutCart = useCallback(
    () => {
      setCheckoutVisibility(true);
      dispatch(checkout(orderList));
    },
    [dispatch, orderList]
  );

  const [{ isHover }, wrapperRef] = useDrop({
    accept: 'order',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      item.type === BUN_PRODUCT_NAME ? dispatch(replaceItem({ item })) : dispatch(addItem({ item }));
    },
  });

  useEffect(() => {
    setOrderDetails();
  }, [ingredients]);

  return (
    <>
      <div className={`${styles.wrapper} ${isHover && styles.wrapper_hovered}`} ref={wrapperRef}>
        {/*buns[0] && <Ingredient
          type='top'
          isLocked={true}
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
        />*/}
        <div className={styles.section}>
          <div className={styles.container}>
            {/*
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
            */}
          </div>
        </div>
        {/*buns[1] && <Ingredient
          type='bottom'
          isLocked={true}
          text={buns[1].name}
          price={buns[1].price}
          thumbnail={buns[1].image}
        />*/}
        {Boolean(ingredients.length) && (
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
