import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useProdData from '../../hooks/useProdData';

import IngredientDetails from '../../components/ingredient-details/IngredientDetails';

import { fetchItem } from '../../services/actions/products';

import { useSelector, useDispatch } from '../../services/hooks';
import type { TRootState } from '../../services/store';

const IngredientsItem: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useSelector((state: TRootState) => state.products);
  const { handleProdData } = useProdData();

  useEffect(
    () => {
      if(!Object.values(item).length) dispatch(fetchItem(id as string));
    },
    [dispatch]
  );

  return (
    <IngredientDetails
      name={item.name}
      image={item.image_large}
      nutritional={handleProdData([
        item.calories ? Number(item.calories) : 0,
        item.proteins ? Number(item.proteins) : 0,
        item.fat ? Number(item.fat) : 0,
        item.carbohydrates ? Number(item.carbohydrates) : 0
      ])}
      isCurrentPage={true}
    />
  )
};

export default IngredientsItem;
