import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/wrapper/Wrapper';
import OrderDetails from '../../components/order-details/OrderDetails';

const OrderItem: FC = () => {
  const { id } = useParams();

  return (
    <Wrapper>
      <p className="text text_type_main-default">Подробности заказа {id}</p>
      <OrderDetails />
    </Wrapper>
  )
};

export default OrderItem;
