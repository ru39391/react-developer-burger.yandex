import React from 'react';
import {
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';

import styles from './Sidebar.module.css';

import { signOut } from '../../services/actions/user';

import {
  PROFILE_URL,
  ORDERS_URL,
  PROFILE_NAV_TITLE,
  ORDERS_NAV_TITLE,
  EXIT_NAV_TITLE,
  LOGOUT_URL,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_ERROR_MSG
} from '../../utils/constants';

function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isModalVisible,
    setModalVisibility
  } = useModal();
  const {
    getToken,
    removeToken,
    isTokenExist,
  } = useAuth();


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

  const logout = () => {
    const { token } = getToken(REFRESH_TOKEN_KEY);
    if(isTokenExist(REFRESH_TOKEN_KEY)) {
      dispatch(signOut({ token }, LOGOUT_URL));
      [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach(key => removeToken(key));
      navigate(`/`);
    } else {
      setModalVisibility(true);
    }
  };

  return (
    <aside>
      <nav className={`${styles.nav} mb-20`}>
        {navArr.map(({
          url,
          title
        }, index) => (
          <NavLink
            key={index}
            to={`/${url}`}
            className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
            style={() => ({ color: location.pathname === `/${url}` && '#fff' })}
          >
            {title}
          </NavLink>
        ))}
        <button className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`} type="button" onClick={logout}>{EXIT_NAV_TITLE}</button>
      </nav>
      <footer className={`${styles.footer} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</footer>
      {isModalVisible && (
        <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={TOKEN_ERROR_MSG} />
        </Modal>
      )}
    </aside>
  )
};

export default Sidebar;
