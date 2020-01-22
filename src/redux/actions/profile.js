import { NotificationError } from 'utils/helpers';
export const GET_INFO_REQUEST = 'PAGE_PROFILE/GET_INFO_REQUEST';
export const GET_INFO_SUCCESS = 'PAGE_PROFILE/GET_INFO_SUCCESS';
export const GET_INFO_FAILURE = 'PAGE_PROFILE/GET_INFO_FAILURE';

export const getFullAccountInfo = () => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_INFO_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.getFullAccountInfo(
        token
      );
      dispatch({
        type: GET_INFO_SUCCESS,
        payload: result
      });
    } catch (error) {
      NotificationError(error, 'getFullAccountInfo');
      dispatch({ type: GET_INFO_FAILURE });
    }
  };
};


export const CHANGE_INFO_REQUEST = 'PAGE_PROFILE/CHANGE_INFO_REQUEST';
export const CHANGE_INFO_SUCCESS = 'PAGE_PROFILE/CHANGE_INFO_SUCCESS';
export const CHANGE_INFO_FAILURE = 'PAGE_PROFILE/CHANGE_INFO_FAILURE';

export const changeAccountInfo = (mrkAccount) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: CHANGE_INFO_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.changeAccountInfo(
        token,
        new MrkAccount(mrkAccount)
      );
      dispatch({
        type: CHANGE_INFO_SUCCESS,
        payload: result
      });
    } catch (error) {
      NotificationError(error, 'changeAccountInfo');
      dispatch({ type: CHANGE_INFO_FAILURE });
    }
  };
};