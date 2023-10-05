import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import ResetPassword from './pages/reset-password/ResetPassword'
import Ingredients from './pages/ingredients/Ingredients';

import AppHeader from './components/app-header/AppHeader';

import {
  DEFAULT_DOC_TITLE,
  ORDERS_URL,
  PROFILE_URL,
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  INGREDIENTS_URL,
} from './utils/constants';

function App() {
  const appRoutes = useRoutes([
    { path: '/', element: <Home /> },
    { path: `/${ORDERS_URL}`, element: <Orders /> },
    { path: `/${PROFILE_URL}`, element: <Profile /> },
    { path: `/${LOGIN_URL}`, element: <Login /> },
    { path: `/${REGISTER_URL}`, element: <Register /> },
    { path: `/${FORGOT_PASSWORD_URL}`, element: <ForgotPassword /> },
    { path: `/${RESET_PASSWORD_URL}`, element: <ResetPassword /> },
    { path: `/${INGREDIENTS_URL}`, element: <Ingredients /> }
  ]);

  useEffect(() => {
    document.title = DEFAULT_DOC_TITLE;
  }, []);

  return (
    <div className="page">
      <AppHeader />
      {appRoutes}
    </div>
  );
}

export default App;
