import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Nav.module.css';

import {
  CONSTRUCTOR_TITLE,
  ORDERS_TITLE,
  PROFILE_URL,
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
      url: `${PROFILE_URL}/${ORDERS_URL}`,
      title: ORDERS_TITLE,
      icon: <ListIcon />
    }
  ];

  return (
    <nav className={styles.wrapper}>
      {navArr.map(({
        url,
        title,
        icon,
      }, index) => (
        <NavLink key={index} to={`/${url}`} className={`${styles.link} text text_color_inactive pt-4 pb-4 pl-5 pr-5`} style={({ isActive }) => ({ color: isActive && '#fff' })}>
          {icon}
          {title}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
