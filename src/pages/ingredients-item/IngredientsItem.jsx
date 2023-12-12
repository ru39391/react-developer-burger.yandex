import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import useProdData from '../../hooks/useProdData';

import IngredientDetails from '../../components/ingredient-details/IngredientDetails';

import { fetchItem } from '../../services/actions/products';

function IngredientsItem() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useSelector(state => state.products);
  const { handleProdData } = useProdData();

  useEffect(
    () => {
      if(!Object.values(item).length) dispatch(fetchItem(id));
    },
    [dispatch]
  );

  return (
    <IngredientDetails
      {...item}
      image={item.image_large}
      nutritional={handleProdData([
        item.calories ? item.calories : 0,
        item.proteins ? item.proteins : 0,
        item.fat ? item.fat : 0,
        item.carbohydrates ? item.carbohydrates : 0
      ])}
      isCurrentPage={true}
    />
  )
};

export default IngredientsItem;
