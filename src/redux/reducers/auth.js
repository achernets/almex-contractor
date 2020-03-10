import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
  token: localStorage.getItem('token') || null,
  ...new MrkClientSession(),
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.payload.id,
        ...action.payload
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
        token: null
      };
    default:
      return state;
  }
};
