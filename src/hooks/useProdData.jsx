import React from 'react';

import {
  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION
} from '../utils/constants';

function useProdData() {
  const captionsArr = [
    CALORIES_CAPTION,
    PROTEINS_CAPTION,
    FAT_CAPTION,
    CARBOHYDRATES_CAPTION
  ];

  const handleProdData = (arr) => {
    return arr.map((value, index) => ({
      name: captionsArr[index],
      value
    }));
  };

  return {
    handleProdData
  };
}

export default useProdData;
