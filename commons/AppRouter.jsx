import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import createStore from '../redux/store/createStore';
import { Overview } from '@containers';
import { OverviewProvider } from '@contexts';

const AppRouter = ({ config }) => {
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
            <Overview path="/" />
          </Router>
        </OverviewProvider>
      </Provider>
    </>
  );
};
export default AppRouter;
