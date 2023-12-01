import React from 'react';

import PropTypes from 'prop-types';
import {
  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION
} from '../utils/constants';

function useProdData(arr) {
  const captionsArr = [
    CALORIES_CAPTION,
    PROTEINS_CAPTION,
    FAT_CAPTION,
    CARBOHYDRATES_CAPTION
  ];

  return arr.map((value, index) => ({
    name: captionsArr[index],
    value
  }));
}

useProdData.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default useProdData;
