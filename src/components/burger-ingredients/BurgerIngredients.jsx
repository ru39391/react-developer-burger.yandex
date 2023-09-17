import {
  useRef,
  useMemo,
  useState,
  useEffect,
  Fragment
} from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';

import ConstructorSection from '../constructor-section/ConstructorSection';
import {
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
  BUN_PRODUCT_CAPTION,
  MAIN_PRODUCT_CAPTION,
  SAUCE_PRODUCT_CAPTION,
} from '../../utils/constants';

function BurgerIngredients() {
  const { items: ingredients } = useSelector(state => state.productData);
  const [current, setCurrent] = useState(BUN_PRODUCT_NAME);
  const filterByType = (params, arr) => params.map(item => arr.filter(({ type }) => type === item));

  const productNames = [
    BUN_PRODUCT_NAME,
    SAUCE_PRODUCT_NAME,
    MAIN_PRODUCT_NAME
  ];

  const sectionRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [
    bunIngredients,
    sauceIngredients,
    mainIngredients
  ] = useMemo(
    () => filterByType(
      productNames,
      ingredients
    ),
    [ingredients]
  );

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        bunRef.current,
        sauceRef.current,
        mainRef.current
      ];

      const roundValue = (value) => Math.round(value.getBoundingClientRect().top);

      sections.forEach((item, index) => {
        if(roundValue(item) <= roundValue(sectionRef.current)) {
          setCurrent(productNames[index]);
        };
      });
    };

    if(sectionRef.current) {
      sectionRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if(sectionRef.current) {
        sectionRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.tablist} mb-10`}>
        {tabsArr.map(({
            value,
            caption,
            handler
          }) => (
            <Tab key={value} value={value} active={current === `${value}`} onClick={handler}>{caption}</Tab>
        ))}
      </div>
      <div className={styles.section} ref={sectionRef}>
        <div className={styles.container}>
          {tabsArr.map(({
              data,
              value,
              caption,
              ref
            }) => (
              <Fragment key={value}>
                <div className="text text_type_main-medium mb-6" ref={ref}>{caption}</div>
                <ConstructorSection data={data} />
              </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
