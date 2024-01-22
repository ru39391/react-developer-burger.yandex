import React, { FC } from 'react';
import {
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

import Modal from '../modal/Modal';
import ModalContent from '../modal-content/ModalContent';

import styles from './Sidebar.module.css';

import { useDispatch } from '../../services/hooks';
import { signOut } from '../../services/actions/user';

import {
  PROFILE_URL,
  ORDERS_URL,
  PROFILE_NAV_TITLE,
  ORDERS_NAV_TITLE,
  EXIT_NAV_TITLE,
  LOGOUT_URL,
  TOKEN_ERROR_MSG
} from '../../utils/constants';

type TNavArr = {
  url: string;
  title: string;
}

const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshToken, isRefTokExist } = useAuth();
  const { isModalVisible, setModalVisibility } = useModal();

  const navArr: TNavArr[] = [
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
    if(isRefTokExist && refreshToken) {
      dispatch(signOut({ token: refreshToken }, LOGOUT_URL));
      navigate(`/`)
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
            style={() => ({ color: location.pathname === `/${url}`  ? '#fff' : '#8585AD' })}
          >
            {title}
          </NavLink>
        ))}
        <button className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`} type="button" data-ref="logout-btn" onClick={logout}>{EXIT_NAV_TITLE}</button>
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
