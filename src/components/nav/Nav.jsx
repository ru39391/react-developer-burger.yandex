import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './Nav.css';

import {
  CONSTRUCTOR_TITLE,
  ORDERS_TITLE,
  ORDERS_URL
} from '../../utils/constants';

function Nav() {
  const navArr = [
    {
      url: '',
      title: CONSTRUCTOR_TITLE,
      icon: <BurgerIcon />
    },
    {
      url: ORDERS_URL,
      title: ORDERS_TITLE,
      icon: <ListIcon />
    }
  ];

  return (
    <nav className="nav">
      {navArr.map(({
        url,
        title,
        icon,
      }, index) => (
        <NavLink key={index} to={`/${url}`} className={({ isActive }) => `nav-link pt-4 pb-4 pl-5 pr-5 ${isActive && 'nav-link_active'}`}>
          {icon}
          {title}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
