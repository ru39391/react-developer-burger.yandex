import React, {
  FC,
  memo,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Card.module.css';

import useProdData from '../../hooks/useProdData';

import { INGREDIENTS_URL, ID_KEY } from '../../utils/constants';
import { setItemDetails } from '../../services/slices/products-slice';

import { useSelector, useDispatch } from '../../services/hooks';
import type { TProduct } from '../../types';

interface ICardProps {
  data: TProduct;
  name: string;
  picture: string;
  thumbnail: string;
  price: number;
  nutritional: number[];
};

const Card: FC<ICardProps> = ({
  data,
  name,
  picture,
  thumbnail,
  price,
  nutritional
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderList } = useSelector(state => state.order);
  const [counter, setCounter] = useState<number>(0);
  const { handleProdData } = useProdData();

  const handleCardData = useCallback(
    () => {
      dispatch(setItemDetails({
        item: {
          name,
          image: picture,
          nutritional: handleProdData(nutritional)
        }
      }));
      navigate(`/${INGREDIENTS_URL}/${data._id}`, {
        replace: true,
        state: {
          layout: location,
          item: {
            ...data,
            image: picture,
            nutritional: handleProdData(nutritional)
          }
        }
      });
    },
    [
      data,
      name,
      picture,
      nutritional,
      dispatch
    ]
  );

  const [{ isClassMod }, cardRef] = useDrag({
    type: 'card',
    item: data,
    collect: (monitor: DragSourceMonitor) => ({
      isClassMod: monitor.isDragging()
    })
  });

  useEffect(() => {
    setCounter(orderList.filter(value => value === data[ID_KEY]).length);
  }, [orderList]);

  return (
    <div className={`${styles.item} ${isClassMod && styles.item_dragged}`} data-ref="card" ref={cardRef} onClick={handleCardData}>
      {Boolean(counter) && <Counter count={counter} size="small" />}
      <img src={thumbnail} alt={name} />
      <div className={`${styles.meta} text text_type_digits-default`}>
        {price.toString()}
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.title} text text_type_main-default`}>{name}</div>
    </div>
  );
}

export default memo(Card);
