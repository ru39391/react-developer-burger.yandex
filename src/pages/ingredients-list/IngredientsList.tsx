import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from '../../services/hooks';
import type { TRootState } from '../../services/store';

const IngredientsList: FC = () => {
  const { items } = useSelector((state: TRootState) => state.products);

  return (
    <>
      <h1 className="text text_type_main-large mb-5">Ингредиенты</h1>
      {items.map(({ _id, name}) => (<NavLink key={_id} className='text text_color_inactive text_type_main-default mb-3' to={`${_id}`}>{name}</NavLink>))}
    </>
  )
};

export default IngredientsList;
