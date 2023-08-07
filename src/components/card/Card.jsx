import React from 'react';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './Card.css';

function Card({
    caption,
    image,
    price
}) {
    return (
        <div className="card">
            <Counter count={1} size="small" />
            <img className="card__picture" src={image} alt={caption} />
            <div className="card__meta text text_type_digits-default">
                {price}
                <CurrencyIcon type="primary" />
            </div>
            <div className="card__title text text_type_main-default">{caption}</div>
        </div>
    );
}

export default Card;
