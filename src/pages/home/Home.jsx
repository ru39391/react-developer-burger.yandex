import {
  useMemo,
  useState,
  useEffect
} from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import api from '../../utils/api';
import {
  HOME_TITLE,
  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,
} from '../../utils/constants';

function Home() {
  const [ingredients, setIngredients] = useState([]);

  function getIngredientsList() {
    api
      .getData()
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterByType = (arr, param) => arr.filter(({ type }) => type === param);

  const [
    bunIngredients,
    mainIngredients,
    sauceIngredients
  ] = [
    useMemo(() => filterByType(ingredients, BUN_PRODUCT_NAME), [ingredients]),
    useMemo(() => filterByType(ingredients, MAIN_PRODUCT_NAME), [ingredients]),
    useMemo(() => filterByType(ingredients, SAUCE_PRODUCT_NAME), [ingredients])    
  ];

  useEffect(() => {
    getIngredientsList();
  }, []);

  return (
    <Wrapper title={HOME_TITLE}>
      <BurgerConstructor
        bunIngredients={bunIngredients}
        mainIngredients={mainIngredients}
        sauceIngredients={sauceIngredients}
      />
      <BurgerIngredients
        bunTop={bunIngredients[0]}
        bunBottom={bunIngredients[1]}
        ingredients={[...mainIngredients, ...sauceIngredients]}
      />
    </Wrapper>
  );
}

export default Home;
