import {
  GET_INFO_REQUEST,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
  CHANGE_INFO_REQUEST,
  CHANGE_INFO_SUCCESS,
  CHANGE_INFO_FAILURE
} from 'redux/actions/profile';

const initialState = {
  mrkAccount: null,
  isFetching: false,
  isSaving: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_INFO_SUCCESS:
      return {
        ...state,
        mrkAccount: action.payload,
        isFetching: false
      };
    case GET_INFO_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case CHANGE_INFO_REQUEST:
      return {
        ...state,
        isSaving: true
      };
    case CHANGE_INFO_SUCCESS:
      return {
        ...state,
        mrkAccount: action.payload,
        isSaving: false
      };
    case CHANGE_INFO_FAILURE:
      return {
        ...state,
        isSaving: false
      };
    default:
      return state;
  }
};
