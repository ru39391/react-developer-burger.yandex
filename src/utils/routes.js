import Main from '../pages/main/Main';
import Orders from '../pages/orders/Orders';
import Profile from '../pages/profile/Profile';

import {
  ORDERS_URL,
  PROFILE_URL
} from '../utils/constants';

const routes = [
  { path: '/', element: <Main /> },
  { path: `/${ORDERS_URL}`, element: <Orders /> },
  { path: `/${PROFILE_URL}`, element: <Profile /> }
];

export default routes;
