import {
  useState,
  useEffect
} from 'react';
import { useRoutes } from 'react-router-dom';

import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Profile from './pages/profile/Profile';

import AppHeader from './components/app-header/AppHeader';

import Api from './utils/api';
import {
  INGREDIENTS_ALIAS,
  DEFAULT_DOC_TITLE,
  ORDERS_URL,
  PROFILE_URL
} from './utils/constants';

import IngredientsContext from './services/ingredientsContext';

function App() {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);

  const api = new Api(INGREDIENTS_ALIAS);

  function getIngredients() {
    api
      .getData()
      .then(({ data }) => {
        setErrorMsg('');
        setIngredients(data);
      })
      .catch((err) => {
        setErrorMsg(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const appRoutes = useRoutes([
    { path: '/', element: <Home ingredients={ingredients} isLoading={isLoading} errorMsg={errorMsg} /> },
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
