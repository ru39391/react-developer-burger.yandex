import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getItems } from '../../services/actions/products';
import { setItemDetails } from '../../services/slices/products-slice';

import type { TRootState } from '../../services/store';

const IngredientsList: FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: TRootState) => state.products);

  useEffect(
    () => {
      dispatch(setItemDetails({ item: {} }));
      //@ts-ignore
      if(!items.length) dispatch(getItems());
    },
    [dispatch]
  );

  return (
    <>
      <h1 className="text text_type_main-large mb-5">Ингредиенты</h1>
      {items.map(({ _id, name}) => (<NavLink key={_id} className='text text_color_inactive text_type_main-default mb-3' to={`${_id}`}>{name}</NavLink>))}
    </>
  )
};

export default IngredientsList;
