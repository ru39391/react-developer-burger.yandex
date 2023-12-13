import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

function OrderItem() {
  const { id } = useParams();

  return (
    <p className="text text_type_main-default">Подробности заказа {id}</p>
  )
};

export default OrderItem;
