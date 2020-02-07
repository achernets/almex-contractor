import {
  GET_MRK_DOCUMENTS_REQUEST,
  GET_MRK_DOCUMENTS_SUCCESS,
  GET_MRK_DOCUMENTS_FAILURE,
  CHANGE_SEARCH_TEXT,
  CHANGE_MRK_DOCUMENT_TYPE,
  SHOW_PREVIEW_DOCUMENT,
  HIDE_PREVIEW_DOCUMENT,
  GET_MRK_DOCUMENT_REQUEST,
  GET_MRK_DOCUMENT_SUCCESS,
  GET_MRK_DOCUMENT_FAILURE,
  SELECTED_ATTACHMENT
} from '../actions/mrkDocuments';

const initialState = {
  mrkDocuments: [],
  count: 0,
  page: 1,
  searchText: '',
  mrkDocumentType: MrkDocumentType.INPUT,
  isSearch: false,
  isFetching: false,
  previewDocument: false,
  mrkDocumentData: null,
  mrkDocumentDataIsFetching: false,
  mrkAttachment: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MRK_DOCUMENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_MRK_DOCUMENTS_SUCCESS:
      return {
        ...state,
        mrkDocuments: action.payload.documentData,
        count: action.payload.count,
        page: action.payload.page,
        isSearch: action.payload.isSearch,
        isFetching: false
      };
    case GET_MRK_DOCUMENTS_FAILURE:
      return {
        ...state,
        mrkDocuments: [],
        count: 0,
        page: 1,
        isFetching: false
      };
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      };
    case CHANGE_MRK_DOCUMENT_TYPE:
      return {
        ...state,
        mrkDocumentType: action.payload
      };
    case SHOW_PREVIEW_DOCUMENT:
      return {
        ...state,
        previewDocument: true
      };
    case HIDE_PREVIEW_DOCUMENT:
      return {
        ...state,
        previewDocument: false,
        mrkDocumentData: null
      };
    case GET_MRK_DOCUMENT_REQUEST:
      return {
        ...state,
        mrkDocumentDataIsFetching: true
      };
    case GET_MRK_DOCUMENT_SUCCESS:
      return {
        ...state,
        mrkDocumentData: action.payload,
        mrkDocumentDataIsFetching: false
      };
    case GET_MRK_DOCUMENT_FAILURE:
      return {
        ...state,
        mrkDocumentDataIsFetching: false
      };
    case SELECTED_ATTACHMENT:
      return {
        ...state,
        mrkAttachment: action.payload
      };
    default:
      return state;
  }
};
