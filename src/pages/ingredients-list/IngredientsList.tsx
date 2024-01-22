import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/hooks';

import { setItemDetails } from '../../services/slices/products-slice';

const IngredientsList: FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);

  useEffect(
    () => {
      dispatch(setItemDetails({ item: {} }));
    },
    []
  );

  return (
    <>
      <h1 className="text text_type_main-large mb-5">Ингредиенты</h1>
      {items.map(({ _id, name}) => (<NavLink key={_id} className='text text_color_inactive text_type_main-default mb-3' to={`${_id}`}>{name}</NavLink>))}
    </>
  )
};

export default IngredientsList;
