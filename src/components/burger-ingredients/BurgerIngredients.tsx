import React, {
  FC,
  useRef,
  useMemo,
  useState,
  useEffect,
  Fragment,
  RefObject
} from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorSection from '../constructor-section/ConstructorSection';

import styles from './BurgerIngredients.module.css';

import {
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
  BUN_PRODUCT_CAPTION,
  MAIN_PRODUCT_CAPTION,
  SAUCE_PRODUCT_CAPTION,
} from '../../utils/constants';

import type { TRootState } from '../../services/store';
import type { TProduct } from '../../types';

type TTabItem = {
  value: string;
  caption: string;
  data: TProduct[];
  ref: RefObject<HTMLDivElement>;
  handler: () => void
}

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState<string>(BUN_PRODUCT_NAME);
  const ingredients = useSelector((state: TRootState) => state.products.items);

  const filterByType = (params: string[], arr: TProduct[]): TProduct[][] => params.map(item => arr.filter(({ type }) => type === item));

  const productNames: string[] = [
    BUN_PRODUCT_NAME,
    SAUCE_PRODUCT_NAME,
    MAIN_PRODUCT_NAME
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

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

  const tabsArr: TTabItem[] = [{
    value: BUN_PRODUCT_NAME,
    caption: BUN_PRODUCT_CAPTION,
    data: bunIngredients,
    ref: bunRef,
    handler: () => {
      setCurrent(BUN_PRODUCT_NAME);
      if(bunRef && bunRef.current) {
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },{
    value: SAUCE_PRODUCT_NAME,
    caption: SAUCE_PRODUCT_CAPTION,
    data: sauceIngredients,
    ref: sauceRef,
    handler: () => {
      setCurrent(SAUCE_PRODUCT_NAME);
      if(sauceRef && sauceRef.current) {
        sauceRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },{
    value: MAIN_PRODUCT_NAME,
    caption: MAIN_PRODUCT_CAPTION,
    data: mainIngredients,
    ref: mainRef,
    handler: () => {
      setCurrent(MAIN_PRODUCT_NAME);
      if(mainRef && mainRef.current) {
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }];

  useEffect(() => {
    const handleScroll = () => {
      const sections: (HTMLDivElement | null)[] = [
        bunRef.current,
        sauceRef.current,
        mainRef.current
      ];
      const roundValue = (value: HTMLDivElement): number => Math.round(value.getBoundingClientRect().top);

      sections.forEach((item: HTMLDivElement | null, index: number) => {
        const itemRoundValue = item ? roundValue(item) : 0;
        const refRoundValue = sectionRef && sectionRef.current ? roundValue(sectionRef.current) : 0;
        if(itemRoundValue <= refRoundValue) {
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
