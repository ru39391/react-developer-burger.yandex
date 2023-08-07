import React from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './BurgerIngredients.css';

import Ingredient from '../ingredient/Ingredient';

function BurgerIngredients({
    bunTop,
    bunBottom,
    ingredients,
}) {
    return (
        <div className="burger-ingredients">
            <div className="burger-ingredients__wrapper">
                {bunTop && <Ingredient
                    type='top'
                    isLocked={true}
                    text={bunTop.name}
                    price={bunTop.price}
                    thumbnail={bunTop.image}
                />}
                <div className="burger-ingredients__main">
                    <div className="burger-ingredients__container">
                        {ingredients.map(({
                            _id,
                            type,
                            name,
                            price,
                            image,
                        }) => (
                            <Ingredient
                                key={_id}
                                type={type}
                                isLocked={true}
                                text={name}
                                price={price}
                                thumbnail={image}
                            />
                        ))}
                    </div>
                </div>
                {bunBottom && <Ingredient
                    type='bottom'
                    isLocked={true}
                    text={bunBottom.name}
                    price={bunBottom.price}
                    thumbnail={bunBottom.image}
                />}
            </div>
            <div className="burger-ingredients__footer">
                <div className="burger-ingredients__meta text text_type_digits-medium">
                    610
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>    
    );
}

export default BurgerIngredients;
