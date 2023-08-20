import React from "react";
import PropTypes from 'prop-types';
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./Ingredient.css";

function Ingredient({
  type,
  isLocked,
  text,
  price,
  thumbnail
}) {
  return (
    <div className="ingredient">
      {type !== "top" && type !== "bottom" && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
    </div>
  );
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
};

export default Ingredient;
