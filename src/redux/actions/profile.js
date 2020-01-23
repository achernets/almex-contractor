import { NotificationError } from 'utils/helpers';
import { notification } from 'antd';
import { I18n } from 'react-redux-i18n';
import { singData } from 'utils/pkcs12';
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

export const changeAccountInfo = (values, sign = true) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: CHANGE_INFO_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const result = await api.MrkClientServiceClient.changeAccountInfo(
        token,
        new MrkAccount(values)
      );
      dispatch({
        type: CHANGE_INFO_SUCCESS,
        payload: result
      });
      notification.success({
        key: 'changeAccountInfo',
        message: I18n.t('notification.profile_update_message'),
        description: I18n.t('notification.profile_update_description')
      });
      if (values.certificate !== null) dispatch(signProfile(values.certificate));
    } catch (error) {
      NotificationError(error, 'changeAccountInfo');
      dispatch({ type: CHANGE_INFO_FAILURE });
    }
  };
};

export const signProfile = (result) => {
  return async (_, getState, api) => {
    try {
      const {
        auth: { token }
      } = getState();
      const infoForSing = await api.MrkClientServiceClient.getProfileInfoForSing(token);
      const signature = await singData(result, infoForSing);
      await api.MrkClientServiceClient.signProfile(token, signature, result.publicKey);
      notification.success({
        key: 'signProfile',
        message: I18n.t('notification.profile_sign_message'),
        description: I18n.t('notification.profile_sign_description')
      });
    } catch (error) {
      NotificationError(error, 'getProfileInfoForSing');
    }
  };
};