import {
  GET_DOCUMENT_PATTERNS_REQUEST,
  PREPARE_MRK_DOCUMENT_REQUEST,
  CREATE_OR_UPDATE_MRK_DOCUMENT_REQUEST,
  CREATE_OR_UPDATE_MRK_DOCUMENT_SUCCESS,
  CREATE_OR_UPDATE_MRK_DOCUMENT_FAILURE,
  SEND_DOCUMENT_REQUEST,
  GET_DOCUMENT_PATTERNS_SUCCESS,
  PREPARE_MRK_DOCUMENT_SUCCESS,
  GET_DOCUMENT_PATTERNS_FAILURE,
  PREPARE_MRK_DOCUMENT_FAILURE,
  SEND_DOCUMENT_SUCCESS,
  SEND_DOCUMENT_FAILURE,
  SELECTED_DOCUMENT_PATTERN,
  EDIT_MRK_DOCUMENT_REQUEST,
  EDIT_MRK_DOCUMENT_SUCCESS,
  EDIT_MRK_DOCUMENT_FAILURE,
  INIT_STATE
} from 'redux/actions/Modal/createMrkDocument';

const initState = {
  step: 0,
  documentPatterns: [],
  documentPattern: null,
  mrkDocumentData: null,
  isFetching: false,
  isPrepareFetching: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case EDIT_MRK_DOCUMENT_REQUEST:
    case CREATE_OR_UPDATE_MRK_DOCUMENT_REQUEST:
    case SEND_DOCUMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_DOCUMENT_PATTERNS_REQUEST:
      return {
        ...state,
        step: 1,
        isFetching: true
      };
    case GET_DOCUMENT_PATTERNS_SUCCESS:
      return {
        ...state,
        documentPatterns: action.payload,
        isFetching: false
      };
    case SELECTED_DOCUMENT_PATTERN:
      return {
        ...state,
        documentPattern: action.payload
      };
    case PREPARE_MRK_DOCUMENT_REQUEST:
      return {
        ...state,
        isPrepareFetching: true
      };
    case PREPARE_MRK_DOCUMENT_SUCCESS:
      return {
        ...state,
        mrkDocumentData: action.payload,
        isPrepareFetching: false,
        step: 2
      };
    case PREPARE_MRK_DOCUMENT_FAILURE:
      return {
        ...state,
        isPrepareFetching: false
      };
    case CREATE_OR_UPDATE_MRK_DOCUMENT_SUCCESS:
      return {
        ...state,
        mrkDocumentData: action.payload,
        isFetching: false
      };
    case SEND_DOCUMENT_SUCCESS:
      return {
        ...state,
        isFetchingSend: false
      };
    case EDIT_MRK_DOCUMENT_FAILURE:
    case CREATE_OR_UPDATE_MRK_DOCUMENT_FAILURE:
    case GET_DOCUMENT_PATTERNS_FAILURE:
    case SEND_DOCUMENT_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case EDIT_MRK_DOCUMENT_SUCCESS:
      return {
        ...state,
        mrkDocumentData: action.payload,
        step: 2,
        isFetching: false
      };
    case INIT_STATE:
      return initState;
    default:
      return state;
  }
};
