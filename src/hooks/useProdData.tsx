import {
  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION
} from '../utils/constants';

import type { TProdData } from '../types';

type TProdDataHook = {
  handleProdData: (arr: number[]) => TProdData[];
}

const useProdData = (): TProdDataHook => {
  const captionsArr: string[] = [
    CALORIES_CAPTION,
    PROTEINS_CAPTION,
    FAT_CAPTION,
    CARBOHYDRATES_CAPTION
  ];

  const handleProdData = (arr: number[]): TProdData[] => {
    return arr.map((value: number, index: number) => ({
      name: captionsArr[index],
      value
    }));
  };

  return {
    handleProdData
  };
}

export default useProdData;
