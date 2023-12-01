import { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';

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
import IngredientsList from './pages/ingredients-list/IngredientsList';
import IngredientsItem from './pages/ingredients-item/IngredientsItem';
import NotFound from './pages/not-found/NotFound';

import ProtectedRoute from './components/protected-route/ProtectedRoute';

import AppHeader from './components/app-header/AppHeader';

import {
  ORDERS_URL,
  PROFILE_URL,
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  INGREDIENTS_URL,
} from './utils/constants';

function App() {
  const location = useLocation();
  const bg = location.state && location.state.bg;
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
          index: true,
          element: <IngredientsList />
        },
        {
          path: `:id`,
          element: <IngredientsItem />
        }
      ]
    },
    { path: `*`, element: <NotFound /> }
  ]);
  //, { location: location || bg }

  useEffect(
    () => {
      console.log(location);
    },
    [location]
  );

  return (
    <div className="page">
      <AppHeader />
      {appRoutes}
    </div>
  );
}

export default App;
