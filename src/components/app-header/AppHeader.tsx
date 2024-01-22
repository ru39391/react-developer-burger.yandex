import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Nav from '../nav/Nav';
import styles from './AppHeader.module.css';
import navStyles from '../nav/Nav.module.css';

import {
  PROFILE_TITLE,
  PROFILE_URL
} from '../../utils/constants';

const AppHeader: FC = () => {
  return (
    <header className={`${styles.wrapper} text text_type_main-default p-4 mb-10`}>
      <div className={styles.container}>
        <Nav />
        <Logo />
        <NavLink to={`/${PROFILE_URL}`} className={`${navStyles.link} text text_color_inactive pt-4 pb-4 pl-5 pr-5`} data-ref={`${PROFILE_URL}-link`} style={({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#fff' : '#8585AD' })}>
          <ProfileIcon type="primary" />
          {PROFILE_TITLE}
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
