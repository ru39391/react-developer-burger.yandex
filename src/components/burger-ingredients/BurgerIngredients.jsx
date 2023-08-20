import {
  useRef,
  useState,
  Fragment
} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './BurgerIngredients.css';

import ConstructorSection from '../constructor-section/ConstructorSection';
import {
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
  BUN_PRODUCT_CAPTION,
  MAIN_PRODUCT_CAPTION,
  SAUCE_PRODUCT_CAPTION,
} from '../../utils/constants';

function BurgerIngredients({
  bunIngredients,
  mainIngredients,
  sauceIngredients
}) {
  const [current, setCurrent] = useState(BUN_PRODUCT_NAME);

  const [
    bunRef,
    sauceRef,
    mainRef
   ] = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const tabsArr = [{
    value: BUN_PRODUCT_NAME,
    caption: BUN_PRODUCT_CAPTION,
    arr: bunIngredients,
    ref: bunRef,
    handler: () => {
      setCurrent(BUN_PRODUCT_NAME);
      bunRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },{
    value: SAUCE_PRODUCT_NAME,
    caption: SAUCE_PRODUCT_CAPTION,
    arr: sauceIngredients,
    ref: sauceRef,
    handler: () => {
      setCurrent(SAUCE_PRODUCT_NAME);
      sauceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },{
    value: MAIN_PRODUCT_NAME,
    caption: MAIN_PRODUCT_CAPTION,
    arr: mainIngredients,
    ref: mainRef,
    handler: () => {
      setCurrent(MAIN_PRODUCT_NAME);
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }];

  return (
    <div className="burger-ingredients">
      <div className="burger-ingredients__tablist">
        {tabsArr.map(({
            value,
            caption,
            handler
          }, index) => (
            <Tab key={index} value={value} active={current === `${value}`} onClick={handler}>{caption}</Tab>
        ))}
      </div>
      <div className="burger-ingredients__wrapper">
        <div className="burger-ingredients__container">
          {tabsArr.map(({
              arr,
              caption,
              ref
            }, index) => (
              <Fragment key={index}>
                <div className="burger-ingredients__title text text_type_main-medium" ref={ref}>{caption}</div>
                <ConstructorSection caption={caption} arr={arr} />
              </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
