import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Wrapper from '../../components/wrapper/Wrapper';

const Ingredients: FC = () => {
  return <Wrapper><Outlet /></Wrapper>;
};

export default Ingredients;
