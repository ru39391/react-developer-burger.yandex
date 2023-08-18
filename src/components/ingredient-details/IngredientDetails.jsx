import React from "react";

import "./IngredientDetails.css";

function IngredientDetails({
  name,
  img,
  nutritional
}) {
  const data = [{
    name: 'Калории,ккал',
    value: '244,4'
  },{
    name: 'Белки, г',
    value: '12,2'
  },{
    name: 'Жиры, г',
    value: '17,2'
  },{
    name: 'Углеводы, г',
    value: '10,2'
  }];

  return (
    <div className="card-details">
      <div className="card-details__title text text_type_main-large pr-15">Детали ингредиента</div>
      <img className="mb-4" src="https://code.s3.yandex.net/react/code/bun-02-large.png" alt={name} />
      <div className="card-details__subtitle text text_type_main-medium mb-8">Биокотлета из марсианской Магнолии</div>
      <div className="card-details__row mb-5">
        {data.map(({
          name,
          value
        }, index) => (
          <div key={index} className="card-details__info text text_type_digits-default text_color_inactive">
            <div className="card-details__info-caption text text_type_main-default">{name}</div>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IngredientDetails;
