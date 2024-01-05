import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/wrapper/Wrapper';
import OrderDetails from '../../components/order-details/OrderDetails';

const OrderItem: FC = () => {
  const { id } = useParams();

  return (
    <Wrapper><OrderDetails /></Wrapper>
  )
};

export default OrderItem;
