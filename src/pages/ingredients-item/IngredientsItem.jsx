import React from 'react';
import { useParams } from 'react-router-dom';

function IngredientsItem() {
  const { id } = useParams();

  return (
    <p className="text text_type_main-default">Страница ингредиента {id}</p>
  )
};

export default IngredientsItem;
