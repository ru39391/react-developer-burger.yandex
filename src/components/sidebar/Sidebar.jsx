import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Sidebar.module.css';

import {
  PROFILE_URL,
  ORDERS_URL,
  PROFILE_NAV_TITLE,
  ORDERS_NAV_TITLE,
  EXIT_NAV_TITLE,
} from '../../utils/constants';

function Sidebar() {
  const location = useLocation();
  const navArr = [
    {
      url: PROFILE_URL,
      title: PROFILE_NAV_TITLE
    },
    {
      url: `${PROFILE_URL}/${ORDERS_URL}`,
      title: ORDERS_NAV_TITLE
    }
  ];

  return (
    <aside>
      <nav className={`${styles.nav} mb-20`}>
        {navArr.map(({
          url,
          title
        }, index) => (
          <NavLink key={index} to={`/${url}`} className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`} style={() => ({ color: location.pathname === `/${url}` && '#fff' })}>{title}</NavLink>
        ))}
        <a className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`} href="#">{EXIT_NAV_TITLE}</a>
      </nav>
      <footer className={`${styles.footer} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</footer>
    </aside>
  )
};

export default Sidebar;
