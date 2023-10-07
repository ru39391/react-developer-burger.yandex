import React from 'react';
import { Outlet } from 'react-router-dom';
import Wrapper from '../../components/wrapper/Wrapper';

function Ingredients() {
  return (
    <Wrapper title="Ингредиенты"><Outlet /></Wrapper>
  )
};

export default Ingredients;
