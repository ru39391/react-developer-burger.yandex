import React, { FC, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { LOGIN_URL, PROFILE_URL } from '../../utils/constants';

interface IProtectedRouteProps {
  children: ReactNode;
  isProfile?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, isProfile }) => {
  const { isLogged } = useAuth();
  const { pathname: prevUrl } = useLocation();

  if(isProfile) {
    return isLogged ? (children as JSX.Element) : <Navigate to={`/${LOGIN_URL}`} state={{ prevUrl }} replace />
  }
  return !isLogged ? (children as JSX.Element) : <Navigate to={`/${PROFILE_URL}`} replace />
};

export default ProtectedRoute;
