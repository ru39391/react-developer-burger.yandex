import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './BurgerConstructor.css';

import ConstructorSection from '../constructor-section/ConstructorSection';
import {
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
  BUN_PRODUCT_CAPTION,
  MAIN_PRODUCT_CAPTION,
  SAUCE_PRODUCT_CAPTION,
} from '../../utils/constants';

function BurgerConstructor({
  bunIngredients,
  mainIngredients,
  sauceIngredients
}) {
  const [current, setCurrent] = useState(BUN_PRODUCT_NAME);

  const tabsArr = [{
    value: BUN_PRODUCT_NAME,
    caption: BUN_PRODUCT_CAPTION,
    arr: bunIngredients
  },{
    value: SAUCE_PRODUCT_NAME,
    caption: SAUCE_PRODUCT_CAPTION,
    arr: sauceIngredients
  },{
    value: MAIN_PRODUCT_NAME,
    caption: MAIN_PRODUCT_CAPTION,
    arr: mainIngredients
  }];

  return (
    <div className="burger-constructor">
      <div className="burger-constructor__tablist">
        {tabsArr.map(({
            value,
            caption
          }, index) => (
            <Tab key={index} value={value} active={current === `${value}`} onClick={setCurrent}>{caption}</Tab>
        ))}
      </div>
      <div className="burger-constructor__wrapper">
        <div className="burger-constructor__container">
          {tabsArr.map(({
              arr,
              caption
            }, index) => (
              <ConstructorSection key={index} caption={caption} arr={arr} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BurgerConstructor;
