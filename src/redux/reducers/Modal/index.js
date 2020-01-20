import { combineReducers } from 'redux';
import mrkDocument from './mrkDocument';
import createMrkDocument from './createMrkDocument';

export default combineReducers({
  mrkDocument,
  createMrkDocument
});