import { useRef, memo } from "react";
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './Ingredient.module.css';

import { productPropTypes } from '../../utils/proptypes';
import {
  ID_KEY,
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
  handleDrop,
  removeIngredient
}) {
  const bunTypeKeys = [TOP_KEY, BOTTOM_KEY];

  function handleClose() {
    removeIngredient(ingredient);
  }

  const [{ isClassMod }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isClassMod: monitor.isDragging()
    })
  });

  const [{ isHover }, dropRef] = useDrop({
    type: 'item',
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      if(item[ID_KEY] === ingredient[ID_KEY]) {
        return;
      } else {
        handleDrop({ draggedItem: item, targetItem: ingredient });
      }
    },
  });

  const ingredientRef = dragRef(dropRef(useRef(null)));

  return (
    <div className={styles.item} ref={!bunTypeKeys.includes(type) ? ingredientRef : null}>
      {!bunTypeKeys.includes(type) && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={bunTypeKeys.includes(type)}
        text={bunTypeKeys.includes(type) ? `${text} (${[TOP_PRODUCT_CAPTION, BOTTOM_PRODUCT_CAPTION][bunTypeKeys.indexOf(type)]})` : text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleClose}
        extraClass={`${isClassMod && styles.active} ${isHover && styles.hover}`}
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
  handleDrop: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired
};

export default memo(Ingredient);
