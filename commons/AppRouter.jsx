import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import createStore from '../redux/store/createStore';
import {
  NotificationLayout,
  Overview,
  OverviewInformation,
  Catalog,
} from '@containers';
import { OverviewProvider } from '@contexts';

const AppRouter = ({ config, user }) => {
  // Redux Store
  const store = createStore;

  if (config.debug && window.Cypress) {
    window.store = store;
  }

  return (
    <>
      <Provider store={store}>
        <OverviewProvider>
          <Router basepath={config.appBasepath} primary={false}>
            {/* We use Reach Router for our local navigation */}

            <NotificationLayout path="notification/:feature/:type" />
            <OverviewInformation path="overview/mejorar-mi-score" />
            <Catalog path="catalogo" />
            <Overview path="/" />
            {/*<ComponentTesting path="/" user={user} />*/}
          </Router>
        </OverviewProvider>
      </Provider>
    </>
  );
};
export default AppRouter;
