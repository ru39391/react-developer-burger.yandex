import {
  memo,
  useCallback
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Card.module.css';

import {
  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION
} from '../../utils/constants';
import { setItemDetails } from '../../services/reducers/products-data';

function Card({
  name,
  image,
  thumbnail,
  price,
  nutritional
}) {
  const dispatch = useDispatch();
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
        image,
        nutritional: nutritional.map((value, index) => ({
          name: captionsArr[index],
          value
        }))
      }));
    },
    [
      name,
      image,
      nutritional
    ]
  );

  return (
    <div className={styles.item} onClick={handleCardData}>
      <Counter count={1} size="small" />
      <img src={thumbnail} alt={name} />
      <div className={`${styles.meta} text text_type_digits-default`}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.title} text text_type_main-default`}>{name}</div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  nutritional: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default memo(Card);
