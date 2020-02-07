import {
  HIDE_MRK_DOCUMENT,
  GET_MRK_DOCUMENT_REQUEST,
  GET_MRK_DOCUMENT_SUCCESS,
  GET_MRK_DOCUMENT_FAILURE,
  SELECTED_ATTACHMENT
} from '../actions/mrkDocument';

const initialState = {
  isFetching: false,
  mrkDocumentData: null,
  mrkAttachment: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MRK_DOCUMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_MRK_DOCUMENT_SUCCESS:
      return {
        ...state,
        mrkDocumentData: action.payload,
        isFetching: false
      };
    case GET_MRK_DOCUMENT_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case HIDE_MRK_DOCUMENT:
      return {
        ...state,
        mrkDocumentData: null,
        mrkAttachment: null
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
