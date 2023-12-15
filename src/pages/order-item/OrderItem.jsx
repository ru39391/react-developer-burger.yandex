import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const OrderItem: FC = () => {
  const { id } = useParams();

  return (
    <p className="text text_type_main-default">Подробности заказа {id}</p>
  )
};

export default OrderItem;
