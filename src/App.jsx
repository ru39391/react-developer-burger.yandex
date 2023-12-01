import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import OrderItem from './pages/order-item/OrderItem';
import Profile from './pages/profile/Profile';
import ProfileForm from './pages/profile-form/ProfileForm';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import ResetPassword from './pages/reset-password/ResetPassword'
import Ingredients from './pages/ingredients/Ingredients';
import IngredientsItem from './pages/ingredients-item/IngredientsItem';
import NotFound from './pages/not-found/NotFound';

import ProtectedRoute from './components/protected-route/ProtectedRoute';

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
    {
      path: `/${PROFILE_URL}`,
      element: <ProtectedRoute isProfile={true}><Profile /></ProtectedRoute>,
      children: [
        {
          index: true,
          element: <ProfileForm />
        },
        {
          path: ORDERS_URL,
          element: <Orders />,
          children: [
            {
              path: `:id`,
              element: <OrderItem />
            }
          ]
        }
      ]
    },
    { path: `/${LOGIN_URL}`, element: <ProtectedRoute><Login /></ProtectedRoute> },
    { path: `/${REGISTER_URL}`, element: <ProtectedRoute><Register /></ProtectedRoute> },
    { path: `/${FORGOT_PASSWORD_URL}`, element: <ProtectedRoute><ForgotPassword /></ProtectedRoute> },
    { path: `/${RESET_PASSWORD_URL}`, element: <ProtectedRoute><ResetPassword /></ProtectedRoute> },
    {
      path: `/${INGREDIENTS_URL}`,
      element: <Ingredients />,
      children: [
        {
          path: `:id`,
          element: <IngredientsItem />
        }
      ]
    },
    { path: `*`, element: <NotFound /> }
  ]);

  useEffect(() => {
    //['accessToken', 'refreshToken'].forEach(key => localStorage.removeItem(key));

    console.log('____________App.jsx____________');
    console.log('refreshToken: ', localStorage.getItem('refreshToken'));
    console.log('accessToken: ', localStorage.getItem('accessToken'));
    console.log('_____________________________');
    document.title = DEFAULT_DOC_TITLE;
  }, [
    localStorage.getItem('refreshToken')
  ]);

  return (
    <div className="page">
      <AppHeader />
      {appRoutes}
    </div>
  );
}

export default App;
