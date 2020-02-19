import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import * as asyncInitialState from 'redux-async-initial-state';
import rootReducer from './reducers';
import { getInitialState } from './asyncStore';
import * as api from 'api';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncTranslationWithStore } from 'react-redux-i18n';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';

export const history = createHashHistory({
  hashType: 'slash',
  basename: process.env.PUBLIC_URL + '/'
});

const logger = createLogger({
  duration: true,
  collapsed: true
});

const create = () => {
  const middlewares = [
    thunk.withExtraArgument(api),
    routerMiddleware(history),
    asyncInitialState.middleware(getInitialState),
    logger
  ];
  const enhancers = [composeWithDevTools(applyMiddleware(...middlewares))];
  let store = createStore(rootReducer(history), compose(...enhancers));
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer(history));
      });
    }
  }
  return store;
};
const store = create();
syncTranslationWithStore(store);
export default store;
