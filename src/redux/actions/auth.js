import { notification } from 'antd';
import { log } from 'utils/helpers';
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
      if (error.preconditionExceptionKey)
        notification.error({
          key: 'login',
          message: error.message
        });
      dispatch({ type: SIGN_IN_FAILURE });
      log(error);
    }
  };
};