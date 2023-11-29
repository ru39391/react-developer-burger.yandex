import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { LOGIN_URL } from '../../utils/constants';

// настроить корректное обновление компонента при перезагрузке страницы
function ProtectedRoute({ children }) {
  const { isLogged } = useSelector(state => state.user);

  return isLogged ? children : <Navigate to={`/${LOGIN_URL}`} replace />
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
