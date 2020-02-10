import { NotificationError } from 'utils/helpers';

export const SELECTED_MRK_DOCUMENT = 'MRK_DOCUMENT/SELECTED_MRK_DOCUMENT';
export const showPreviewDocument = mrkDocument => {
  return async (dispatch) => {
    dispatch({
      type: SELECTED_MRK_DOCUMENT
    });
    dispatch(getMrkDocumentData(mrkDocument.id));
  };
};

export const HIDE_MRK_DOCUMENT = 'MRK_DOCUMENT/HIDE_MRK_DOCUMENT';
export const hideMrkDocument = () => {
  return async (dispatch) => {
    dispatch({
      type: HIDE_MRK_DOCUMENT
    });
  };
};

export const GET_MRK_DOCUMENT_REQUEST = 'MRK_DOCUMENT/GET_MRK_DOCUMENT_REQUEST';
export const GET_MRK_DOCUMENT_SUCCESS = 'MRK_DOCUMENT/GET_MRK_DOCUMENT_SUCCESS';
export const GET_MRK_DOCUMENT_FAILURE = 'MRK_DOCUMENT/GET_MRK_DOCUMENT_FAILURE';

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

export const SELECTED_ATTACHMENT = 'MRK_DOCUMENT/SELECTED_ATTACHMENT';
export const selectedAttachment = mrkAttachment => {
  return async (dispatch, getState, api) => {
    dispatch({
      type: SELECTED_ATTACHMENT,
      payload: mrkAttachment
    });
  };
};

export const TOOGLE_VIEW_MODE = 'MRK_DOCUMENT/TOOGLE_VIEW_MODE';
export const toogleView = () => {
  return async (dispatch, getState, api) => {
    const {
      mrkDocument: { showChain, chain }
    } = getState();
    dispatch({
      type: TOOGLE_VIEW_MODE,
      payload: !showChain
    });
    if (!showChain && chain.length === 0) dispatch(getChainDocuments());
  };
};

export const GET_CHAIN_REQUEST = 'MRK_DOCUMENT/GET_CHAIN_REQUEST';
export const GET_CHAIN_SUCCESS = 'MRK_DOCUMENT/GET_CHAIN_SUCCESS';
export const GET_CHAIN_FAILURE = 'MRK_DOCUMENT/GET_CHAIN_FAILURE';

export const getChainDocuments = () => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_CHAIN_REQUEST });
    try {
      const {
        auth: { token },
        mrkDocument: { mrkDocumentData, activeChain }
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
          chain: result.documentData,
          activeChain: activeChain ? activeChain : mrkDocumentData
        }
      });
    } catch (error) {
      NotificationError(error, 'getMrkDocumentPage');
      dispatch({ type: GET_CHAIN_FAILURE });
    }
  };
};

export const CHANGE_CHAIN_REQUEST = 'MRK_DOCUMENT/CHANGE_CHAIN_REQUEST';
export const CHANGE_CHAIN_SUCCESS = 'MRK_DOCUMENT/CHANGE_CHAIN_SUCCESS';
export const CHANGE_CHAIN_FAILURE = 'MRK_DOCUMENT/CHANGE_CHAIN_FAILURE';

export const changeChain = documentId => {
  return async (dispatch, getState, api) => {
    dispatch({
      type: CHANGE_CHAIN_REQUEST,
      payload: documentId
    });
    try {
      const {
        auth: { token }
      } = getState();
      const result = documentId === null ? null : await api.MrkClientServiceClient.getMrkDocumentData(
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