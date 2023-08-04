import React from 'react';
import {
    Logo,
    BurgerIcon,
    ProfileIcon,
    ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './AppHeader.css';

function AppHeader() {
  return (
    <header className="header text text_type_main-large p-4">
        <BurgerIcon />
        <ListIcon />
        <ProfileIcon />
        <Logo />
    </header>
  );
}

export default AppHeader;
