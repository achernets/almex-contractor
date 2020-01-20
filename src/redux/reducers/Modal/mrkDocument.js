import {
  GET_MRK_DOCUMENT_REQUEST,
  GET_MRK_DOCUMENT_SUCCESS,
  GET_MRK_DOCUMENT_FAILURE,
  SEND_DOCUMENT_REQUEST,
  SEND_DOCUMENT_SUCCESS,
  SEND_DOCUMENT_FAILURE,
  CHANGE_INFO_TYPE,
  GET_CHAIN_REQUEST,
  GET_CHAIN_SUCCESS,
  GET_CHAIN_FAILURE,
  CHANGE_CHAIN_REQUEST,
  CHANGE_CHAIN_SUCCESS,
  CHANGE_CHAIN_FAILURE,
  INIT_STATE
} from 'redux/actions/Modal/mrkDocument';

const initState = {
  showChain: false,
  mrkDocumentData: null,
  chain: [],
  activeChain: null,
  loadChainId: null,
  isFetching: false,
  isFetchingSend: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case CHANGE_CHAIN_REQUEST:
      return {
        ...state,
        loadChainId: action.payload
      };
    case GET_MRK_DOCUMENT_REQUEST:
    case GET_CHAIN_REQUEST:
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
    case GET_CHAIN_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case SEND_DOCUMENT_FAILURE:
      return {
        ...state,
        isFetchingSend: false
      };
    case CHANGE_INFO_TYPE:
      return {
        ...state,
        showChain: action.payload
      };
    case GET_CHAIN_SUCCESS:
      return {
        ...state,
        chain: action.payload.documentData,
        activeChain: action.payload.activeChain,
        isFetching: false
      };
    case CHANGE_CHAIN_SUCCESS:
      return {
        ...state,
        activeChain: action.payload,
        loadChainId: null,
        isFetching: false
      };
    case CHANGE_CHAIN_FAILURE:
      return {
        ...state,
        loadChainId: null,
      };
    case INIT_STATE:
      return initState;
    default:
      return state;
  }
};
