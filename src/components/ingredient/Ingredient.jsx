import { memo } from "react";
import PropTypes from 'prop-types';
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './Ingredient.module.css';

import { productPropTypes } from '../../utils/proptypes';
import {
  TOP_KEY,
  BOTTOM_KEY,
  TOP_PRODUCT_CAPTION,
  BOTTOM_PRODUCT_CAPTION,
} from '../../utils/constants';

function Ingredient({
  type,
  text,
  price,
  thumbnail,
  ingredient,
  removeIngredient
}) {
  const bunTypeKeys = [TOP_KEY, BOTTOM_KEY];

  function handleClose() {
    removeIngredient(ingredient);
  }

  return (
    <div className={styles.item}>
      {!bunTypeKeys.includes(type) && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={bunTypeKeys.includes(type)}
        text={bunTypeKeys.includes(type) ? `${text} (${[TOP_PRODUCT_CAPTION, BOTTOM_PRODUCT_CAPTION][bunTypeKeys.indexOf(type)]})` : text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleClose}
      />
    </div>
  );
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  ingredient: productPropTypes.isRequired,
  removeIngredient: PropTypes.func.isRequired
};

export default memo(Ingredient);
