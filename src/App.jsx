import { useState, useEffect } from 'react';
import AppHeader from './components/app-header/AppHeader';
import Main from './components/main/Main';
import BurgerConstructor from './components/burger-constructor/BurgerConstructor';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';

import data from './utils/data';
import {
  DEFAULT_DOC_TITLE,
  CONSTRUCTOR_TITLE
} from './utils/constants';

function App() {
  const [bunIngredients, setBunIngredients] = useState([]);
  const [mainIngredients, setMainIngredients] = useState([]);
  const [sauceIngredients, setSauceIngredients] = useState([]);

  const filterByType = (arr, param) => arr.filter(({ type }) => type === param);

  const ingredientsDataArr = [{
    param: 'bun',
    handler: (arr, param) => {
      setBunIngredients(filterByType(arr, param));
    }
  }, {
    param: 'main',
    handler: (arr, param) => {
      setMainIngredients(filterByType(arr, param));
    }
  }, {
    param: 'sauce',
    handler: (arr, param) => {
      setSauceIngredients(filterByType(arr, param));
    }
  }];

  useEffect(() => {
    document.title = DEFAULT_DOC_TITLE;
    ingredientsDataArr.forEach(({ param, handler }) => {
      handler(data, param);
    });
  }, []);

  return (
    <div className="page">
      <AppHeader />
      <Main title={CONSTRUCTOR_TITLE}>
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
      </Main>
    </div>
  );
}

export default App;
