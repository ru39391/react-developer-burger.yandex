import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const OrdersList: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
};

export default OrdersList;
