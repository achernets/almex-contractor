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