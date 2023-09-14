import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import { getItems } from '../../services/actions';

import styles from '../../components/wrapper/Wrapper.module.css';

import {
  HOME_TITLE,
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
} from '../../utils/constants';

function Home({
  ingredients,
  isLoading,
  errorMsg
}) {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.constructor);
  const filterByType = (param, arr) => arr.filter(({ type }) => type === param);

  console.log(items);

  const [
    bunIngredients,
    mainIngredients,
    sauceIngredients
  ] = useMemo(
    () => [
      filterByType(BUN_PRODUCT_NAME, ingredients),
      filterByType(MAIN_PRODUCT_NAME, ingredients),
      filterByType(SAUCE_PRODUCT_NAME, ingredients)
    ],
    [ingredients]
  );

  const bun = bunIngredients[Math.floor(Math.random() * bunIngredients.length)];

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  return (
    <Wrapper title={HOME_TITLE} isLoading={isLoading} errorMsg={errorMsg}>
      <div className={styles.container}>
        <BurgerIngredients
          bunIngredients={bunIngredients}
          mainIngredients={mainIngredients}
          sauceIngredients={sauceIngredients}
        />
        <BurgerConstructor
          bunIngredients={bunIngredients.map(item => item._id === bun._id ? item : bun)}
          mainIngredients={mainIngredients}
          sauceIngredients={sauceIngredients}
        />
      </div>
    </Wrapper>
  )
};

Home.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default Home;
