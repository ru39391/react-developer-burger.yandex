import React, { FC } from 'react';
import {
  useLocation,
  useNavigate,
  Outlet,
  Routes,
  Route
} from 'react-router-dom';

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

import Modal from './components/modal/Modal';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import IngredientDetails from './components/ingredient-details/IngredientDetails';

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

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const layout = location.state && location.state.layout;

  function closeModal() {
    navigate(`/`, { replace: true, state: null });
  }

  return (
    <div className="page">
      <AppHeader />
      <Routes location={layout || location}>
        <Route path='/' element={<Home />} />
        <Route path={`/${PROFILE_URL}`} element={<ProtectedRoute isProfile={true}><Profile /></ProtectedRoute>}>
          <Route index element={<ProfileForm />} />
          <Route path={ORDERS_URL} element={<Orders />}>
            <Route path=':id' element={<OrderItem />} />
          </Route>
        </Route>
        <Route path={`/${LOGIN_URL}`} element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path={`/${REGISTER_URL}`} element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path={`/${FORGOT_PASSWORD_URL}`} element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
        <Route path={`/${RESET_PASSWORD_URL}`} element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        <Route path={`/${INGREDIENTS_URL}`} element={<Ingredients />}>
          <Route index element={<IngredientsList />} />
          <Route path=':id' element={<IngredientsItem />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      {layout && (
        <Routes>
          <Route path={`/${INGREDIENTS_URL}`} element={<Outlet />}>
            <Route path=':id' element={<Modal isModalOpen={Boolean(layout)} closeModal={closeModal}><IngredientDetails {...location.state.item} /></Modal>} />
          </Route>
        </Routes>
        )
      }
    </div>
  );
}

export default App;
