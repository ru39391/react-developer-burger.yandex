import React from 'react';
import './ConstructorSection.css';

import Card from '../card/Card';

function ConstructorSection({
    arr,
    caption
}) {
    return (
        <>
            <div className="burger-constructor__title text text_type_main-medium">{caption}</div>
            <div className="burger-constructor__list">
                {arr.map(({
                    _id,
                    name,
                    price,
                    image,
                }) => (
                    <Card
                        key={_id}
                        caption={name}
                        price={price}
                        image={image}
                    />
                ))}
            </div>
        </>
    );
}

export default ConstructorSection;
