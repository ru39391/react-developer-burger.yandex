import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import PropTypes from 'prop-types';
import { LOGIN_URL, PROFILE_URL } from '../../utils/constants';

function ProtectedRoute({ children, isProfile }) {
  const { isLogged } = useAuth();

  if(isProfile) {
    return isLogged ? children : <Navigate to={`/${LOGIN_URL}`} replace />
  }
  return !isLogged ? children : <Navigate to={`/${PROFILE_URL}`} replace />
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isProfile: PropTypes.bool
};

export default ProtectedRoute;
