import {
  GET_MRK_DOCUMENT_REQUEST,
  GET_MRK_DOCUMENT_SUCCESS,
  GET_MRK_DOCUMENT_FAILURE,
  SEND_DOCUMENT_REQUEST,
  SEND_DOCUMENT_SUCCESS,
  SEND_DOCUMENT_FAILURE,
  INIT_STATE
} from 'redux/actions/Modal/mrkDocument';

const initState = {
  mrkDocumentData: null,
  isFetching: false,
  isFetchingSend: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_MRK_DOCUMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SEND_DOCUMENT_REQUEST:
      return {
        ...state,
        isFetchingSend: true
      };
    case GET_MRK_DOCUMENT_SUCCESS:
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
    case GET_MRK_DOCUMENT_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case SEND_DOCUMENT_FAILURE:
      return {
        ...state,
        isFetchingSend: false
      };
    case INIT_STATE:
      return initState;
    default:
      return state;
  }
};
