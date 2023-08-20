import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './Card.css';

import {
  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION
} from '../../utils/constants';

function Card({
  name,
  image,
  thumbnail,
  price,
  nutritional,
  showCardDetails
}) {
  const captionsArr = [
    CALORIES_CAPTION,
    PROTEINS_CAPTION,
    FAT_CAPTION,
    CARBOHYDRATES_CAPTION
  ];

  function handleCardData() {
    showCardDetails({
      name,
      image,
      nutritional: nutritional.map((value, index) => ({
        name: captionsArr[index],
        value
      }))
    });
  }

  return (
    <div className="card" onClick={handleCardData}>
      <Counter count={1} size="small" />
      <img className="card__picture" src={thumbnail} alt={name} />
      <div className="card__meta text text_type_digits-default">
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div className="card__title text text_type_main-default">{name}</div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  nutritional: PropTypes.array.isRequired,
  showCardDetails: PropTypes.func.isRequired
};

export default memo(Card);
