import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import {
  HOME_TITLE,
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
} from '../../utils/constants';
import { productPropTypes } from '../../utils/proptypes';

function Home({
  data,
  isLoading,
  errorMsg
}) {
  const filterByType = (param, arr) => arr.filter(({ type }) => type === param);

  const [
    bunIngredients,
    mainIngredients,
    sauceIngredients
  ] = [
    useMemo(() => filterByType(BUN_PRODUCT_NAME, data), [data]),
    useMemo(() => filterByType(MAIN_PRODUCT_NAME, data), [data]),
    useMemo(() => filterByType(SAUCE_PRODUCT_NAME, data), [data])
  ];

  return (
    <Wrapper title={HOME_TITLE} isLoading={isLoading} errorMsg={errorMsg}>
      <div className="main__wrapper">
        <BurgerIngredients
          bunIngredients={bunIngredients}
          mainIngredients={mainIngredients}
          sauceIngredients={sauceIngredients}
        />
        <BurgerConstructor
          bunIngredients={bunIngredients}
          mainIngredients={mainIngredients}
          sauceIngredients={sauceIngredients}
        />
      </div>
    </Wrapper>
  )
};

Home.propTypes = {
  data: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default Home;
