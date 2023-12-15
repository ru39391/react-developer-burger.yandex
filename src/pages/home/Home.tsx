import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Wrapper from '../../components/wrapper/Wrapper';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';

import styles from '../../components/wrapper/Wrapper.module.css';

import { HOME_TITLE } from '../../utils/constants';


const Home: FC = () => {
  return (
    <Wrapper title={HOME_TITLE}>
      <div className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </Wrapper>
  )
};

export default Home;
