import { isEmpty, keys, map } from 'lodash';
import { PAGE_SIZE } from 'constants/table';
import { hideMrkDocument } from './mrkDocument';
import { NotificationError, confirmationAction } from 'utils/helpers';
import { I18n } from 'react-redux-i18n';

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
    dispatch(hideMrkDocument());
  };
};

export const UPDATE_DOCUMENT = 'PAGE_MRK_DOCUMENTS/UPDATE_DOCUMENT';
export const updateDocument = document => {
  return async (dispatch, getState, api) => {
    const {
      mrkDocuments: { mrkDocuments }
    } = getState();
    dispatch({
      type: UPDATE_DOCUMENT,
      payload: map(mrkDocuments, item => new MrkDocument(item.id === document.id ? document : item))
    });
  };
};


export const REMOVE_DOCUMENT = 'PAGE_MRK_DOCUMENTS/REMOVE_DOCUMENT';
export const removeDocument = (document) => {
  return async (dispatch, getState, api) => {
    const fn = async () => {
      try {
        const {
          auth: { token },
          mrkDocuments: { page }
        } = getState();
        await api.MrkClientServiceClient.deleteMrkDocument(
          token,
          document.id
        );
        dispatch({
          type: REMOVE_DOCUMENT
        });
        dispatch(getMrkDocuments(page));
      } catch (error) {
        NotificationError(error, 'deleteMrkDocument');
      }
    };
    confirmationAction(fn, null, I18n.t('confirmation.title_remove_document_desc', { name: document.name }));
  };
};