import { NotificationError } from 'utils/helpers';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const login = values => {
  return async (dispatch, getState, api) => {
    dispatch({ type: SIGN_IN_REQUEST });
    try {
      const {
        i18n: { locale },
        settings: { APP_VERSION }
      } = getState();
      const authenticate = await api.MrkClientServiceClient.authMrkClient(
        values.login,
        values.password,
        null,
        locale,
        APP_VERSION
      );
      localStorage.setItem('token', authenticate.id);
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: authenticate
      });
    } catch (error) {
      NotificationError(error, 'authMrkClient');
      dispatch({ type: SIGN_IN_FAILURE });
    }
  };
};


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const logout = () => {
  return async (dispatch, getState, api) => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      await api.MrkClientServiceClient.logout(token);
      localStorage.removeItem('token');
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } catch (error) {
      NotificationError(error, 'logout');
      dispatch({ type: LOGOUT_FAILURE });
    }
  };
};