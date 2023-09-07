import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";

import { ORDERS_TITLE, UNDER_CONSTRUCTION_TEXT } from "../../utils/constants";

function Orders() {
  return (
    <Wrapper title={ORDERS_TITLE}>
      <p className="text text_type_main-default">{UNDER_CONSTRUCTION_TEXT}</p>
    </Wrapper>
  );
}

export default Orders;
