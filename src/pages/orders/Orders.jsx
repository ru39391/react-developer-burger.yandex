import React from 'react';
import { Outlet } from 'react-router-dom';

function Orders() {
  return (
    <div>
      <h1 className="text text_type_main-large mb-5">История заказов</h1>
      <Outlet />
    </div>
  )
};

export default Orders;
