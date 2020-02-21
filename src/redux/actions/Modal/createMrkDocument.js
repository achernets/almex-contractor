import { NotificationError } from 'utils/helpers';
import { getMrkDocuments } from 'redux/actions/mrkDocuments';
import { updateMrkDocumentData } from 'redux/actions/Modal/mrkDocument';
import { actions } from 'react-redux-modals';
import { notification } from 'antd';
import { singData } from 'utils/pkcs12';
import { isEmpty, find } from 'lodash';
import { I18n } from 'react-redux-i18n';

export const GET_DOCUMENT_PATTERNS_REQUEST = 'MODAL_CREATE_MRK_DOCUMENT/GET_DOCUMENT_PATTERNS_REQUEST';
export const GET_DOCUMENT_PATTERNS_SUCCESS = 'MODAL_CREATE_MRK_DOCUMENT/GET_DOCUMENT_PATTERNS_SUCCESS';
export const GET_DOCUMENT_PATTERNS_FAILURE = 'MODAL_CREATE_MRK_DOCUMENT/GET_DOCUMENT_PATTERNS_FAILURE';

export const getAllDocumentPatterns = (extRespPatternId, parentId) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_DOCUMENT_PATTERNS_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const filter = new KazFilter({
        position: 0,
        countFilter: 999,
        orders: [],
        items: isEmpty(extRespPatternId) ? [] : [new FilterItem({
          field: 'id',
          value: extRespPatternId,
          condition: FilterCondition.CONTAIN,
          fType: FilterFieldType.STRING
        })]
      });
      const result = await api.MrkClientServiceClient.getAllDocumentPatterns(
        token,
        filter
      );
      dispatch({
        type: GET_DOCUMENT_PATTERNS_SUCCESS,
        payload: result
      });
      if (!isEmpty(extRespPatternId)) {
        dispatch(setDocumentPattern(find(result, { id: extRespPatternId })));
        dispatch(prepareDraftDocument(extRespPatternId, parentId));
      }
    } catch (error) {
      NotificationError(error, 'getAllDocumentPatterns');
      dispatch({ type: GET_DOCUMENT_PATTERNS_FAILURE });
    }
  };
};

export const SELECTED_DOCUMENT_PATTERN = 'MODAL_CREATE_MRK_DOCUMENT/SELECTED_DOCUMENT_PATTERN';

export const setDocumentPattern = documentPattern => {
  return (dispatch) => {
    dispatch({
      type: SELECTED_DOCUMENT_PATTERN,
      payload: documentPattern
    });
  };
};

export const PREPARE_MRK_DOCUMENT_REQUEST = 'MODAL_CREATE_MRK_DOCUMENT/PREPARE_MRK_DOCUMENT_REQUEST';
export const PREPARE_MRK_DOCUMENT_SUCCESS = 'MODAL_CREATE_MRK_DOCUMENT/PREPARE_MRK_DOCUMENT_SUCCESS';
export const PREPARE_MRK_DOCUMENT_FAILURE = 'MODAL_CREATE_MRK_DOCUMENT/PREPARE_MRK_DOCUMENT_FAILURE';

export const prepareDraftDocument = (id, parentId = null) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: PREPARE_MRK_DOCUMENT_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.prepareDraftDocument(
        token,
        id,
        null
      );
      dispatch({
        type: PREPARE_MRK_DOCUMENT_SUCCESS,
        payload: new MrkDocumentData({
          ...result,
          document: new MrkDocument({ ...result.document, parentId: parentId })
        })
      });
    } catch (error) {
      NotificationError(error, 'prepareDraftDocument');
      dispatch({ type: PREPARE_MRK_DOCUMENT_FAILURE });
    }
  };
};

export const EDIT_MRK_DOCUMENT_REQUEST = 'MODAL_CREATE_MRK_DOCUMENT/EDIT_MRK_DOCUMENT_REQUEST';
export const EDIT_MRK_DOCUMENT_SUCCESS = 'MODAL_CREATE_MRK_DOCUMENT/EDIT_MRK_DOCUMENT_SUCCESS';
export const EDIT_MRK_DOCUMENT_FAILURE = 'MODAL_CREATE_MRK_DOCUMENT/EDIT_MRK_DOCUMENT_FAILURE';

export const editDocument = documentId => {
  return async (dispatch, getState, api) => {
    dispatch({ type: EDIT_MRK_DOCUMENT_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.getMrkDocumentData(
        token,
        documentId
      );
      dispatch({
        type: EDIT_MRK_DOCUMENT_SUCCESS,
        payload: result
      });
      dispatch(actions.showModal('MODAL_CREATE_MRK_DOCUMENT'));
    } catch (error) {
      NotificationError(error, 'getMrkDocumentData');
      dispatch({ type: EDIT_MRK_DOCUMENT_FAILURE });
    }
  };
};

export const CREATE_OR_UPDATE_MRK_DOCUMENT_REQUEST = 'MODAL_CREATE_MRK_DOCUMENT/CREATE_OR_UPDATE_MRK_DOCUMENT_REQUEST';
export const CREATE_OR_UPDATE_MRK_DOCUMENT_SUCCESS = 'MODAL_CREATE_MRK_DOCUMENT/CREATE_OR_UPDATE_MRK_DOCUMENT_SUCCESS';
export const CREATE_OR_UPDATE_MRK_DOCUMENT_FAILURE = 'MODAL_CREATE_MRK_DOCUMENT/CREATE_OR_UPDATE_MRK_DOCUMENT_FAILURE';

export const createOrUpdateMrkDocument = (data, send = false, certificate = null) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: CREATE_OR_UPDATE_MRK_DOCUMENT_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.createOrUpdateMrkDocument(
        token,
        data
      );
      dispatch({
        type: CREATE_OR_UPDATE_MRK_DOCUMENT_SUCCESS,
        payload: result
      });
      if (send) {
        let signature = null;
        let attachmentSignature = null;
        if (certificate !== null) {
          const infoForSing = await api.MrkClientServiceClient.getDocumentInfoForSing(
            token,
            result.document.id
          );
          const signature = await singData(certificate, infoForSing);
          await api.MrkClientServiceClient.signProfile(token, signature, certificate.publicKey);
        }
        dispatch(sendDocument(signature, attachmentSignature));
      } else {
        dispatch(getMrkDocuments());
      }
      dispatch(actions.hideModal('MODAL_CREATE_MRK_DOCUMENT'));
      dispatch(updateMrkDocumentData());
    } catch (error) {
      NotificationError(error, 'createOrUpdateMrkDocument');
      dispatch({ type: CREATE_OR_UPDATE_MRK_DOCUMENT_FAILURE });
    }
  };
};

export const SEND_DOCUMENT_REQUEST = 'MODAL_CREATE_MRK_DOCUMENT/SEND_DOCUMENT_REQUEST';
export const SEND_DOCUMENT_SUCCESS = 'MODAL_CREATE_MRK_DOCUMENT/SEND_DOCUMENT_SUCCESS';
export const SEND_DOCUMENT_FAILURE = 'MODAL_CREATE_MRK_DOCUMENT/SEND_DOCUMENT_FAILURE';

export const sendDocument = (signature = null, attachmentSignature = null) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: SEND_DOCUMENT_REQUEST });
    try {
      const {
        auth: { token },
        mrkDocuments: { page, mrkDocuments },
        modal: { createMrkDocument: { mrkDocumentData: { document: { id } } } }
      } = getState();
      const result = await api.MrkClientServiceClient.sendDocument(token, id, signature, attachmentSignature);
      dispatch({
        type: SEND_DOCUMENT_SUCCESS,
        payload: result
      });
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

export const INIT_STATE = 'MODAL_CREATE_MRK_DOCUMENT/INIT_STATE';
export const initState = () => {
  return dispatch => {
    dispatch({
      type: INIT_STATE
    });
  };
};
