import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import styles from '../../components/wrapper/Wrapper.module.css';

import { HOME_TITLE } from '../../utils/constants';
import { getItems } from '../../services/actions';

function Home() {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  return (
    <Wrapper title={HOME_TITLE}>
      <div className={styles.container}>
        <BurgerIngredients />
        {/*
        <BurgerConstructor
          bunIngredients={bunIngredients.map(item => item._id === bun._id ? item : bun)}
          mainIngredients={mainIngredients}
          sauceIngredients={sauceIngredients}
        />
        */}
      </div>
    </Wrapper>
  )
};

export default Home;
