import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Nav from '../nav/Nav';
import './AppHeader.css';

import {
  PROFILE_TITLE,
  PROFILE_URL
} from '../../utils/constants';

function AppHeader() {
  return (
    <header className="header text text_type_main-default p-4">
      <div className="header__container">
        <Nav />
        <Logo />
        <NavLink to={`/${PROFILE_URL}`}  className={({ isActive }) => `nav-link pt-4 pb-4 pl-5 pr-5 ${isActive && 'nav-link_active'}`}>
          <ProfileIcon />
          {PROFILE_TITLE}
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
