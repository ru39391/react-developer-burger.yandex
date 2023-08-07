import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './BurgerConstructor.css';

import ConstructorSection from '../constructor-section/ConstructorSection';
import {
    BUN_PRODUCT_CAPTION,
    MAIN_PRODUCT_CAPTION,
    SAUCE_PRODUCT_CAPTION,
} from '../../utils/constants';

function BurgerConstructor({
    bunIngredients,
    mainIngredients,
    sauceIngredients
}) {
    const [current, setCurrent] = useState('bun');

    return (
        <div className="burger-constructor">
            <div className="burger-constructor__tablist">
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>{BUN_PRODUCT_CAPTION}</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>{SAUCE_PRODUCT_CAPTION}</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>{MAIN_PRODUCT_CAPTION}</Tab>
            </div>
            <div className="burger-constructor__wrapper">
                <div className="burger-constructor__container">
                    <ConstructorSection caption={BUN_PRODUCT_CAPTION} arr={bunIngredients} />
                    <ConstructorSection caption={SAUCE_PRODUCT_CAPTION} arr={sauceIngredients} />
                    <ConstructorSection caption={MAIN_PRODUCT_CAPTION} arr={mainIngredients} />
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;
