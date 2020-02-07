import { isEmpty, keys } from 'lodash';
import { PAGE_SIZE } from 'constants/table';
import { NotificationError } from 'utils/helpers';

export const GET_MRK_DOCUMENTS_REQUEST = 'PAGE_MRK_DOCUMENTS/GET_MRK_DOCUMENTS_REQUEST';
export const GET_MRK_DOCUMENTS_SUCCESS = 'PAGE_MRK_DOCUMENTS/GET_MRK_DOCUMENTS_SUCCESS';
export const GET_MRK_DOCUMENTS_FAILURE = 'PAGE_MRK_DOCUMENTS/GET_MRK_DOCUMENTS_FAILURE';

export const getMrkDocuments = (page = 1) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_MRK_DOCUMENTS_REQUEST });
    try {
      const {
        auth: { token },
        mrkDocuments: { mrkDocumentType, searchText }
      } = getState();
      const filter = new KazFilter({
        position: page * PAGE_SIZE - PAGE_SIZE,
        countFilter: PAGE_SIZE,
        orders: [],
        items: [new FilterItem({
          field: 'type',
          value: `MrkDocumentType.${keys(MrkDocumentType)[mrkDocumentType]}`,
          condition: FilterCondition.EQUAL,
          fType: FilterFieldType.ENUMERATED
        })]
      });
      if (!isEmpty(searchText)) filter.items.push(
        new FilterItem({
          field: 'name',
          value: searchText,
          condition: FilterCondition.CONTAIN,
          fType: FilterFieldType.STRING
        })
      );
      const result = await api.MrkClientServiceClient.getMrkDocumentPage(
        token,
        filter
      );
      dispatch({
        type: GET_MRK_DOCUMENTS_SUCCESS,
        payload: {
          ...result,
          page,
          isSearch: !isEmpty(searchText)
        }
      });
    } catch (error) {
      NotificationError(error, 'getMrkDocuments');
      dispatch({ type: GET_MRK_DOCUMENTS_FAILURE });
    }
  };
};

export const CHANGE_SEARCH_TEXT = 'PAGE_MRK_DOCUMENTS/CHANGE_SEARCH_TEXT';
export const changeTextSearch = (text = '') => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_SEARCH_TEXT,
      payload: text
    });
  };
};

export const CHANGE_MRK_DOCUMENT_TYPE = 'PAGE_MRK_DOCUMENTS/CHANGE_MRK_DOCUMENT_TYPE';
export const changeMrkDocumentType = type => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_MRK_DOCUMENT_TYPE,
      payload: type
    });
    dispatch(getMrkDocuments());
  };
};

export const SHOW_PREVIEW_DOCUMENT = 'PAGE_MRK_DOCUMENTS/SHOW_PREVIEW_DOCUMENT';
export const showPreviewDocument = mrkDocument => {
  return async (dispatch) => {
    dispatch({
      type: SHOW_PREVIEW_DOCUMENT
    });
    dispatch(getMrkDocumentData(mrkDocument.id));
  };
};

export const HIDE_PREVIEW_DOCUMENT = 'PAGE_MRK_DOCUMENTS/HIDE_PREVIEW_DOCUMENT';
export const hidePreviewDocument = () => {
  return async (dispatch) => {
    dispatch({
      type: HIDE_PREVIEW_DOCUMENT
    });
  };
};

export const GET_MRK_DOCUMENT_REQUEST = 'PAGE_MRK_DOCUMENTS/GET_MRK_DOCUMENT_REQUEST';
export const GET_MRK_DOCUMENT_SUCCESS = 'PAGE_MRK_DOCUMENTS/GET_MRK_DOCUMENT_SUCCESS';
export const GET_MRK_DOCUMENT_FAILURE = 'PAGE_MRK_DOCUMENTS/GET_MRK_DOCUMENT_FAILURE';

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

export const SELECTED_ATTACHMENT = 'PAGE_MRK_DOCUMENTS/SELECTED_ATTACHMENT';

export const selectedAttachment = mrkAttachment => {
  return async (dispatch, getState, api) => {
    dispatch({
      type: SELECTED_ATTACHMENT,
      payload: mrkAttachment
    });
  };
};