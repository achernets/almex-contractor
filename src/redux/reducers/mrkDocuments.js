import {
  GET_MRK_DOCUMENT_REQUEST,
  GET_MRK_DOCUMENT_SUCCESS,
  GET_MRK_DOCUMENT_FAILURE,
  CHANGE_SEARCH_TEXT
} from '../actions/mrkDocuments';

const initialState = {
  mrkDocuments: [],
  count: 0,
  page: 1,
  searchText: '',
  isFetching: false
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
        mrkDocuments: action.payload.documentData,
        count: action.payload.count,
        page: action.payload.page,
        isFetching: false
      };
    case GET_MRK_DOCUMENT_FAILURE:
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
    default:
      return state;
  }
};
