import React from 'react';
import {
    Counter,
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
    const [current, setCurrent] = React.useState('one');

    return (
        <>
            <Counter count={233} size="small" />
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>One</Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Two</Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Three</Tab>
            </div>
        </>
    );
}

export default BurgerConstructor;
