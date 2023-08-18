import React from "react";
import CheckoutImg from '../../images/checkout.png';

import "./OrderDetails.css";

function OrderDetails() {
  return (
    <div className="order-details pt-20 pb-20">
      <div className="mb-15">
        <div className="order-details__id text text_type_digits-large mb-8">034536</div>
        <div className="text text_type_main-medium">идентификатор заказа</div>
      </div>
      <img className="mb-15" src={CheckoutImg} alt="Ваш заказ начали готовить" />
      <div className="order-details__footer">
        <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
        <div className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</div>
      </div>
    </div>
  );
}

export default OrderDetails;
