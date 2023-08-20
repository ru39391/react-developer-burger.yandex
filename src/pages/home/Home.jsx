import { useCallback } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import {
  HOME_TITLE,
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
} from '../../utils/constants';

function Home({ data }) {
  const filterByType = (
    paramsArr,
    filtredArr
  ) => paramsArr.map(
    (param) => filtredArr.filter(({ type }) => type === param)
  );

  const [
    bunIngredients,
    mainIngredients,
    sauceIngredients
  ] = useCallback(filterByType([
    BUN_PRODUCT_NAME,
    MAIN_PRODUCT_NAME,
    SAUCE_PRODUCT_NAME
  ], data), [data]);

  return (
    <Wrapper title={HOME_TITLE}>
      <BurgerIngredients
        bunIngredients={bunIngredients}
        mainIngredients={mainIngredients}
        sauceIngredients={sauceIngredients}
      />
      <BurgerConstructor
        bunTop={bunIngredients[0]}
        bunBottom={bunIngredients[1]}
        ingredients={[...mainIngredients, ...sauceIngredients]}
      />
    </Wrapper>
  );
}

export default Home;
