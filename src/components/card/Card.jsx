import {
  memo,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Card.module.css';

import { productPropTypes } from '../../utils/proptypes';
import {
  ID_KEY,
  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION
} from '../../utils/constants';
import { setItemDetails } from '../../services/slices/products-slice';

function Card({
  data,
  name,
  picture,
  thumbnail,
  price,
  nutritional
}) {
  const dispatch = useDispatch();
  const { orderList } = useSelector(state => state.order);
  const [counter, setCounter] = useState(0);

  const captionsArr = [
    CALORIES_CAPTION,
    PROTEINS_CAPTION,
    FAT_CAPTION,
    CARBOHYDRATES_CAPTION
  ];

  const handleCardData = useCallback(
    () => {
      dispatch(setItemDetails({
        name,
        image: picture,
        nutritional: nutritional.map((value, index) => ({
          name: captionsArr[index],
          value
        }))
      }));
    },
    [
      name,
      picture,
      nutritional,
      dispatch
    ]
  );

  const [{ isClassMod }, cardRef] = useDrag({
    type: 'card',
    item: data,
    collect: monitor => ({
      isClassMod: monitor.isDragging()
    })
  });

  useEffect(() => {
    setCounter(orderList.filter(value => value === data[ID_KEY]).length);
  }, [orderList]);

  return (
    <div className={`${styles.item} ${isClassMod && styles.item_dragged}`} ref={cardRef} onClick={handleCardData}>
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

Card.propTypes = {
  data: productPropTypes.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  nutritional: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default memo(Card);
