import { memo } from "react";
import PropTypes from 'prop-types';

import styles from "./IngredientDetails.module.css";

import { nutritionalPropTypes } from '../../utils/proptypes';

function IngredientDetails({
  name,
  image,
  nutritional
}) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.title} text text_type_main-large pr-15`}>Детали ингредиента</div>
      <img className="mb-4" src={image} alt={name} />
      <div className={`${styles.subtitle} text text_type_main-medium mb-8`}>{name}</div>
      <div className={`${styles.row} mb-5`}>
        {nutritional && nutritional.map(({
          name,
          value
        }, index) => (
          <div key={index} className={`${styles.info} text text_type_digits-default text_color_inactive`}>
            <div className="text text_type_main-default">{name}</div>
            {value.toString()}
          </div>
        ))}
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  nutritional: PropTypes.arrayOf(nutritionalPropTypes.isRequired)
};

export default memo(IngredientDetails);
