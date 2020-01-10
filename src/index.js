import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from 'pages/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'redux/store';
import { ModalRoot } from 'react-redux-modals';
import * as modalComponents from 'components/Modals';

const ModalRootWithStore = ModalRoot(store);

const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
        <ModalRootWithStore modalComponents={modalComponents} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('pages/App', () => {
    const NextApp = require('pages/App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
