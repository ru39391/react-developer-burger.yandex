import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Nav.module.css';

import {
  CONSTRUCTOR_TITLE,
  FEED_TITLE,
  FEED_URL
} from '../../utils/constants';

type TNavItem = {
  url: string;
  title: string;
  icon: ReactNode;
}

const Nav: FC = () => {
  const navArr: TNavItem[] = [
    {
      url: '',
      title: CONSTRUCTOR_TITLE,
      icon: <BurgerIcon type="primary" />
    },
    {
      url: FEED_URL,
      title: FEED_TITLE,
      icon: <ListIcon type="primary" />
    }
  ];

  return (
    <nav className={styles.wrapper}>
      {navArr.map(({
        url,
        title,
        icon,
      }, index) => (
        <NavLink key={index} to={`/${url}`} className={`${styles.link} text text_color_inactive pt-4 pb-4 pl-5 pr-5`} style={({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#fff' : '#8585AD' })}>
          {icon}
          {title}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
