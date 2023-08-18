import Home from '../pages/home/Home';
import Orders from '../pages/orders/Orders';
import Profile from '../pages/profile/Profile';

import {
  ORDERS_URL,
  PROFILE_URL
} from '../utils/constants';

const routes = [
  { path: '/', element: <Home /> },
  { path: `/${ORDERS_URL}`, element: <Orders /> },
  { path: `/${PROFILE_URL}`, element: <Profile /> }
];

export default routes;
