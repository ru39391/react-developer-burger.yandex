import { useState, useEffect } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import data from '../../utils/data';
import { MAIN_TITLE } from '../../utils/constants';

function Main() {
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
      ingredientsDataArr.forEach(({ param, handler }) => {
        handler(data, param);
      });
    }, []);

    return (
        <Wrapper title={MAIN_TITLE}>
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
  
  export default Main;