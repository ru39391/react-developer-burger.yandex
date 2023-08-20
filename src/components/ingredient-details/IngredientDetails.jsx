import { memo } from "react";
import PropTypes from 'prop-types';

import "./IngredientDetails.css";

import { nutritionalPropTypes } from '../../utils/proptypes';

function IngredientDetails({
  name,
  image,
  nutritional
}) {
  return (
    <div className="card-details">
      <div className="card-details__title text text_type_main-large pr-15">Детали ингредиента</div>
      <img className="mb-4" src={image} alt={name} />
      <div className="card-details__subtitle text text_type_main-medium mb-8">{name}</div>
      <div className="card-details__row mb-5">
        {nutritional.map(({
          name,
          value
        }, index) => (
          <div key={index} className="card-details__info text text_type_digits-default text_color_inactive">
            <div className="card-details__info-caption text text_type_main-default">{name}</div>
            {value.toString()}
          </div>
        ))}
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  nutritional: PropTypes.arrayOf(nutritionalPropTypes.isRequired).isRequired
};

export default memo(IngredientDetails);
