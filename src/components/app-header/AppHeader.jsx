import React from 'react';
import {
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Nav from '../nav/Nav';
import './AppHeader.css';

function AppHeader() {
  return (
    <header className="header text text_type_main-default p-4">
      <div className="header__container">
        <Nav />
        <Logo />
        <a className="nav-link pt-4 pb-4 pl-5 pr-5" href="/">
          <ProfileIcon />
          Личный кабинет
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
