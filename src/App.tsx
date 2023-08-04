import { useEffect } from 'react';
import AppHeader from './components/app-header/AppHeader';
import BurgerConstructor from './components/burger-constructor/BurgerConstructor';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';

import data from './utils/data';
import { DEFAULT_DOC_TITLE } from './utils/constants';

function App() {
  useEffect(() => {
    document.title = DEFAULT_DOC_TITLE;
  }, []);

  return (
    <>
      <AppHeader />
      <BurgerConstructor />
      <BurgerIngredients ingredients={data} />
    </>
  );
}

export default App;
