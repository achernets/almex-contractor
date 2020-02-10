import {
  HIDE_MRK_DOCUMENT,
  GET_MRK_DOCUMENT_REQUEST,
  GET_MRK_DOCUMENT_SUCCESS,
  GET_MRK_DOCUMENT_FAILURE,
  SELECTED_ATTACHMENT,
  TOOGLE_VIEW_MODE,
  GET_CHAIN_REQUEST,
  GET_CHAIN_SUCCESS,
  GET_CHAIN_FAILURE,
  CHANGE_CHAIN_REQUEST,
  CHANGE_CHAIN_SUCCESS,
  CHANGE_CHAIN_FAILURE
} from '../actions/mrkDocument';

const initialState = {
  isFetching: false,
  mrkDocumentData: null,
  mrkAttachment: null,
  showChain: false,
  chain: [],
  activeChain: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MRK_DOCUMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        showChain: false,
        chain: [],
        activeChain: null
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
    case TOOGLE_VIEW_MODE:
      return {
        ...state,
        showChain: action.payload
      };
    case GET_CHAIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_CHAIN_SUCCESS:
      return {
        ...state,
        chain: action.payload.chain,
        activeChain: action.payload.activeChain,
        isFetching: false
      };
    case GET_CHAIN_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case CHANGE_CHAIN_REQUEST:
      return {
        ...state,
        loadChainId: action.payload
      };
    case CHANGE_CHAIN_SUCCESS:
      return {
        ...state,
        activeChain: action.payload,
        loadChainId: null
      };
    case CHANGE_CHAIN_FAILURE:
      return {
        ...state,
        loadChainId: null
      };
    default:
      return state;
  }
};
