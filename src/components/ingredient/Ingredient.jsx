import React from 'react';
import {
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import './Ingredient.css';

function Ingredient({
    type,
    isLocked,
    text,
    price,
    thumbnail
}) {
    return (
        <div className="ingredient">
            {type !== 'top' && type !== 'bottom' && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </div>
    );
}

export default Ingredient;
