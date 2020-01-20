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

export const updateMrkDocumentData = documentId => {
  return (dispatch, getState) => {
    const {
      modal: { mrkDocument: { mrkDocumentData: { document: { id } } } }
    } = getState();
    if (id === documentId) dispatch(getMrkDocumentData(documentId));
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

export const CHANGE_INFO_TYPE = 'MODAL_MRK_DOCUMENT/CHANGE_INFO_TYPE';
export const changeShowChain = showChain => {
  return async (dispatch, getState) => {
    const {
      modal: { mrkDocument: { chain } }
    } = getState();
    dispatch({
      type: CHANGE_INFO_TYPE,
      payload: showChain
    });
    if (showChain && chain.length === 0) dispatch(getChainDocuments());
  };
};

export const GET_CHAIN_REQUEST = 'MODAL_MRK_DOCUMENT/GET_CHAIN_REQUEST';
export const GET_CHAIN_SUCCESS = 'MODAL_MRK_DOCUMENT/GET_CHAIN_SUCCESS';
export const GET_CHAIN_FAILURE = 'MODAL_MRK_DOCUMENT/GET_CHAIN_FAILURE';

export const getChainDocuments = () => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_CHAIN_REQUEST });
    try {
      const {
        auth: { token },
        modal: { mrkDocument: { mrkDocumentData } }
      } = getState();
      const filter = new KazFilter({
        position: 0,
        countFilter: 50,
        orders: ['createDate'],
        items: [new FilterItem({
          field: 'groupNumber',
          value: mrkDocumentData.document.groupNumber,
          condition: FilterCondition.EQUAL,
          fType: FilterFieldType.NUMBER
        })]
      });
      const result = await api.MrkClientServiceClient.getMrkDocumentPage(
        token,
        filter
      );
      dispatch({
        type: GET_CHAIN_SUCCESS,
        payload: {
          ...result,
          activeChain: mrkDocumentData
        }
      });
    } catch (error) {
      NotificationError(error, 'getMrkDocumentPage');
      dispatch({ type: GET_CHAIN_FAILURE });
    }
  };
};

export const CHANGE_CHAIN_REQUEST = 'MODAL_MRK_DOCUMENT/CHANGE_CHAIN_REQUEST';
export const CHANGE_CHAIN_SUCCESS = 'MODAL_MRK_DOCUMENT/CHANGE_CHAIN_SUCCESS';
export const CHANGE_CHAIN_FAILURE = 'MODAL_MRK_DOCUMENT/CHANGE_CHAIN_FAILURE';

export const changeChain = documentId => {
  return async (dispatch, getState, api) => {
    dispatch({ type: CHANGE_CHAIN_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.getMrkDocumentData(
        token,
        documentId
      );
      dispatch({
        type: CHANGE_CHAIN_SUCCESS,
        payload: result
      });
    } catch (error) {
      NotificationError(error, 'getMrkDocumentData');
      dispatch({ type: CHANGE_CHAIN_FAILURE });
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
