import PropTypes from 'prop-types';

import {
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME
} from './constants';

const productPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([BUN_PRODUCT_NAME, MAIN_PRODUCT_NAME, SAUCE_PRODUCT_NAME]).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired
});

const nutritionalPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
});

const fieldPropTypes = PropTypes.shape({
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
});

export {
  productPropTypes,
  nutritionalPropTypes,
  fieldPropTypes
};
