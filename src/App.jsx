import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import AppHeader from './components/app-header/AppHeader';

import routes from './utils/routes';
import { DEFAULT_DOC_TITLE } from './utils/constants';

function App() {
  const appRoutes = useRoutes(routes);

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
