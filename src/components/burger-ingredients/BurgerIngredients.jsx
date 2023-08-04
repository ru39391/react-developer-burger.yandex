import React from 'react';
import {
    ConstructorElement,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './BurgerIngredients.css';

function BurgerIngredients({ ingredients }) {
  return (
    <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ingredients.map(({
                _id,
                type,
                name,
                price,
                image,
            }) => (
                <ConstructorElement
                    key={_id}
                    type={type}
                    isLocked={true}
                    text={name}
                    price={price}
                    thumbnail={image}
                />
            ))}
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </>    
  );
}

export default BurgerIngredients;
