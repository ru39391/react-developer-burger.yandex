import {
  useRef,
  useState,
  Fragment
} from 'react';
import PropTypes from 'prop-types';
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
import { productPropTypes } from '../../utils/proptypes';

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
    data: bunIngredients,
    ref: bunRef,
    handler: () => {
      setCurrent(BUN_PRODUCT_NAME);
      bunRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },{
    value: SAUCE_PRODUCT_NAME,
    caption: SAUCE_PRODUCT_CAPTION,
    data: sauceIngredients,
    ref: sauceRef,
    handler: () => {
      setCurrent(SAUCE_PRODUCT_NAME);
      sauceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },{
    value: MAIN_PRODUCT_NAME,
    caption: MAIN_PRODUCT_CAPTION,
    data: mainIngredients,
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
              data,
              caption,
              ref
            }, index) => (
              <Fragment key={index}>
                <div className="burger-ingredients__title text text_type_main-medium" ref={ref}>{caption}</div>
                <ConstructorSection caption={caption} data={data} />
              </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  bunIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
  mainIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
  sauceIngredients: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
