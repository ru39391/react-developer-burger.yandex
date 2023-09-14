import { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import styles from '../../components/wrapper/Wrapper.module.css';

import {
  HOME_TITLE,
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
} from '../../utils/constants';
import IngredientsContext from '../../services/ingredientsContext';

function Home({
  isLoading,
  errorMsg
}) {
  const ingredients = useContext(IngredientsContext);
  const filterByType = (param, arr) => arr.filter(({ type }) => type === param);

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
