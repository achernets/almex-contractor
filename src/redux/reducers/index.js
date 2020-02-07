import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as asyncInitialState from 'redux-async-initial-state';
import { reducer as modals } from 'react-redux-modals';
import { i18nReducer } from 'react-redux-i18n';
import auth from './auth';
import mrkDocuments from './mrkDocuments';
import mrkDocument from './mrkDocument';
import settings from './settings';
import profile from './profile';
import modal from './Modal';
export default history =>
  asyncInitialState.outerReducer(
    combineReducers({
      router: connectRouter(history),
      asyncInitialState: asyncInitialState.innerReducer,
      i18n: i18nReducer,
      modals,
      modal,
      auth,
      mrkDocuments,
      mrkDocument,
      settings,
      profile
    })
  );