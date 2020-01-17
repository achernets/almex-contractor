import { NotificationError } from 'utils/helpers';
import { getMrkDocuments } from 'redux/actions/mrkDocuments';
import { actions } from 'react-redux-modals';
import { notification } from 'antd';
import { I18n } from 'react-redux-i18n';

export const GET_MRK_DOCUMENT_REQUEST = 'MODAL_MRK_DOCUMENT/GET_MRK_DOCUMENT_REQUEST';
export const GET_MRK_DOCUMENT_SUCCESS = 'MODAL_MRK_DOCUMENT/GET_MRK_DOCUMENT_SUCCESS';
export const GET_MRK_DOCUMENT_FAILURE = 'MODAL_MRK_DOCUMENT/GET_MRK_DOCUMENT_FAILURE';

export const getMrkDocumentData = documentId => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_MRK_DOCUMENT_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.getMrkDocumentData(
        token,
        documentId
      );
      dispatch({
        type: GET_MRK_DOCUMENT_SUCCESS,
        payload: result
      });
    } catch (error) {
      NotificationError(error, 'getMrkDocumentData');
      dispatch({ type: GET_MRK_DOCUMENT_FAILURE });
    }
  };
};

export const SEND_DOCUMENT_REQUEST = 'MODAL_MRK_DOCUMENT/SEND_DOCUMENT_REQUEST';
export const SEND_DOCUMENT_SUCCESS = 'MODAL_MRK_DOCUMENT/SEND_DOCUMENT_SUCCESS';
export const SEND_DOCUMENT_FAILURE = 'MODAL_MRK_DOCUMENT/SEND_DOCUMENT_FAILURE';

export const sendDocument = () => {
  return async (dispatch, getState, api) => {
    dispatch({ type: SEND_DOCUMENT_REQUEST });
    try {
      const {
        auth: { token },
        mrkDocuments: { page, mrkDocuments },
        modal: { mrkDocument: { mrkDocumentData: { document: { id } } } }
      } = getState();
      const result = await api.MrkClientServiceClient.sendDocument(token, id);
      dispatch({
        type: SEND_DOCUMENT_SUCCESS,
        payload: result
      });
      dispatch(actions.hideModal('MODAL_MRK_DOCUMENT'));
      notification.success({
        key: 'sendDocument',
        message: I18n.t('notification.sendDocument_title')
      });
      const pageNext = mrkDocuments.length === 1 ? (page - 1 === 0 ? 1 : page - 1) : page;
      dispatch(getMrkDocuments(pageNext));
    } catch (error) {
      NotificationError(error, 'sendDocument');
      dispatch({ type: SEND_DOCUMENT_FAILURE });
    }
  };
};

export const INIT_STATE = 'MODAL_MRK_DOCUMENT/INIT_STATE';
export const initState = () => {
  return dispatch => {
    dispatch({
      type: INIT_STATE
    });
  };
};
