import Immutable from 'immutable';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { Config } from '@tresdoce-toolkit/core';
import Configuration from '@config';

Config.addConfig(Configuration);
const { config } = Config.getAppConfig();
const debug = config.debug;

const createMiddlewares = (debug) => {
  const middlewares = [reduxThunk];
  if (debug && typeof window !== 'undefined') {
    middlewares.push(
      createLogger({
        level: 'info',
        duration: true,
        collapsed: true,
        stateTransformer: (state) => {
          const newState = {};

          for (const i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
              newState[i] = state[i].toJS();
            } else {
              newState[i] = state[i];
            }
          }

          return newState;
        },
      })
    );
  }

  return middlewares;
};

const immutableChildren = (obj) => {
  const state = {};
  Object.keys(obj).forEach((key) => {
    state[key] = Immutable.fromJS(obj[key]);
  });
  return state;
};

// FUNCIONA
/*const envsDebug = ['local-mock', 'local-pom', 'dev', 'stg'];
const debug = envsDebug.includes(config.distributionChannel);*/

const initialState = {};
const middlewares = createMiddlewares(debug);
const state = immutableChildren(initialState);
const composeEnhancers = compose(
  debug &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (f) => f
);

export default createStore(
  rootReducer,
  state,
  composeEnhancers(applyMiddleware(...middlewares))
);
