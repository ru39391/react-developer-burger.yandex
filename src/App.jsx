import {
  useState,
  useEffect
} from 'react';
import { useRoutes } from 'react-router-dom';

import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Profile from './pages/profile/Profile';

import AppHeader from './components/app-header/AppHeader';

import api from './utils/api';
import {
  DEFAULT_DOC_TITLE,
  ORDERS_URL,
  PROFILE_URL
} from './utils/constants';

function App() {
  const [ingredients, setIngredients] = useState([]);

  function getIngredients() {
    api
      .getData()
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const appRoutes = useRoutes([
    { path: '/', element: <Home data={ingredients} /> },
    { path: `/${ORDERS_URL}`, element: <Orders /> },
    { path: `/${PROFILE_URL}`, element: <Profile /> }
  ]);

  useEffect(() => {
    getIngredients();
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
