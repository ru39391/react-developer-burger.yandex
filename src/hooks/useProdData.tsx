import {
  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION
} from '../utils/constants';

import type { TProdData } from '../types';

interface IProdDataHook {
  handleProdData: (arr: number[]) => TProdData[];
}

const useProdData = (): IProdDataHook => {
  const captionsArr: string[] = [
    CALORIES_CAPTION,
    PROTEINS_CAPTION,
    FAT_CAPTION,
    CARBOHYDRATES_CAPTION
  ];

  const handleProdData = (arr: number[]): TProdData[] => {
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
