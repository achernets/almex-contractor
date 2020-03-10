import { isEmpty, upperFirst, includes, compact, get, uniqueId } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { notification, Modal } from 'antd';
import React from 'react';
import moment from 'moment';
import { ONLY_OFFICE_TEXT, ONLY_OFFICE_SPREADSHEET, ONLY_OFFICE_PRESENTATION } from 'constants/general';
import store from 'redux/store';

export const log = (...props) => {
  /* eslint-disable-next-line */
  if (process.env.NODE_ENV === 'development' || window.showLogs) console.log(...props);
};

export const PUBLIC_URL = process.env.PUBLIC_URL;

export const getToken = () => {
  const state = store.getState();
  const { token } = state.auth;
  return token;
};

export const userName = ({ firstName, lastName }) => {
  return `${isEmpty(firstName) ? '' : upperFirst(firstName) + ''} ${isEmpty(lastName) ? '' : upperFirst(lastName)}`;
};

export const getFio = ({ firstName, lastName, middleName }) => {
  return `${isEmpty(lastName) ? '' : upperFirst(lastName)} ${isEmpty(firstName) ? '' : upperFirst(firstName)[0] + '.'}${isEmpty(middleName) ? '' : upperFirst(middleName)[0] + '.'}`;
};

export const getFioAlmex = ({ userFirstName, userLastName, userMiddleName }) => {
  return `${isEmpty(userLastName) ? '' : upperFirst(userLastName)} ${isEmpty(userFirstName) ? '' : upperFirst(userFirstName)[0] + '.'}${isEmpty(userMiddleName) ? '' : upperFirst(userMiddleName)[0] + '.'}`;
};

export const NotificationError = (error, key = uniqueId('notification_')) => {
  const time = Math.random() > 0.5 ? 4 : 7;
  if (error.preconditionExceptionKey) notification.error({
    key,
    message: error.preconditionExceptionKey,
    duration: time,
    description: <>
      {error.message}
      <video width="280" height="180" preload="auto" autoPlay={true}>
        {time === 4 ?
          <source src={require('../images/2020-02-19 15.32.28.mp4')} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' /> :
          <source src={require('../images/Directed by Robert B. Weide - Clip [SD 360p].mp4')} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
        }
      </video>
    </>
  });
  log(key, error);
};

export const confirmationAction = (fn, title, desc) => {
  Modal.confirm({
    title: title || I18n.t('confirmation.title'),
    content: desc || null,
    okText: I18n.t('confirmation.okText'),
    okType: 'danger',
    cancelText: I18n.t('common.cancel'),
    onOk: () => fn()
  });
};

export const fileReader = (file, type = 'readAsBinaryString') => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target.result);
    };
    reader.onerror = e => {
      reject(e);
    };
    switch (type) {
      case 'readAsBinaryString':
        return reader.readAsBinaryString(file);
      default:
        return reader.readAsBinaryString(file);
    }
  });
};

export const getPortions = (size = 0, string = '') => {
  if (size > 1000000) {
    if (size > 1000000000) {
      return {
        count: Math.ceil(string.length / 1000000000),
        portions: 1000000000
      };
    } else {
      return {
        count: Math.ceil(string.length / 1000000),
        portions: 1000000
      };
    }
  }
  return {
    count: 1,
    portions: string.length
  };
};

export const getLocaleCode = (locale) => {
  switch (locale) {
    case 'en':
      return import('antd/lib/locale/en_US');
    case 'ru':
      return import('antd/lib/locale/ru_RU');
    case 'uk':
      return import('antd/lib/locale/uk_UA');
    default:
      return import('antd/lib/locale/en_US');
  }
};

export const getAntdLocale = () => {
  const state = store.getState();
  const { locale, translations } = state.i18n;
  return translations[locale].antd;
};

export const getContentItemValue = item => {
  const value = get(item, 'value.strValue', null);
  switch (item.type) {
    case ContentItemType.USER_CHOICE:
      return compact(get(item, 'users', [])).map(itm => getFioAlmex(itm)).join(', ');
    case ContentItemType.CHECKBOX:
      return I18n.t(value === 'true' ? 'common.true' : 'common.false');
    case ContentItemType.CALENDAR:
      return value === null || value === -1 ? null : moment(Number(value)).format('DD.MM.YYYY HH:mm');
    default:
      return value;
  }
};

export const getOnlyOfficeUrl = () => {
  const state = store.getState();
  const { ONLY_OFFICE_URL } = state.settings;
  return `${ONLY_OFFICE_URL}/web-apps/apps/api/documents/api.js`;
};

export const onlyOfficeCallBackUrl = ({ id }) => {
  const {
    settings: { THRIFT }
  } = store.getState();
  return `${THRIFT.URL}/${THRIFT.API}/onlyOfficeCallBack?attachmentId=${id}`;
};

export const getTypeOnlyOffice = (mrkAttachment) => {
  const ext = getAttachmentExt(mrkAttachment);
  if (includes(ONLY_OFFICE_TEXT, ext)) return 'text';
  if (includes(ONLY_OFFICE_SPREADSHEET, ext)) return 'spreadsheet';
  if (includes(ONLY_OFFICE_PRESENTATION, ext)) return 'presentation';
  return null;
};

export const getAttachmentUrl = ({ id }, type = AttachmentType.ORIGINAL) => {
  const {
    auth: { token },
    settings: { THRIFT }
  } = store.getState();
  return `${THRIFT.URL}/${THRIFT.API}/attachment?token=${token}&id=${id}`;
  //return `${THRIFT.URL}/${THRIFT.API}/attachment?token=${token}&id=${mrkAttachment.id}&type=${type}`;
};

export const getAttachmentName = ({ fileName }) => {
  return fileName.substr(0, fileName.lastIndexOf('.'));
};

export const getAttachmentExt = ({ fileName }) => {
  return fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
};

export const getFileExt = (fileName) => {
  return fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
};

export const attachmentIcon = (fileName) => {
  switch (getFileExt(fileName)) {
    case 'doc':
    case 'docx':
      return require('../images/attachments/Doc.svg');
    case 'xls':
    case 'xlsx':
      return require('../images/attachments/Xls.svg');
    case 'pdf':
      return require('../images/attachments/Pdf.svg');
    case 'png':
      return require('../images/attachments/Png.svg');
    case 'jpg':
    case 'jpeg':
    case 'tif':
    case 'tiff':
    case 'bmp':
    case 'wbmp':
    case 'gif':
      return require('../images/attachments/Jpg.svg');
    default:
      return require('../images/attachments/Undefined.svg');
  }
};

export const getSignInSystemText = (signInSystem) => {
  switch (signInSystem) {
    case SignInSystem.ALMEX:
      return I18n.t('SignInSystem.ALMEX_TOOLTIP');
    case SignInSystem.EXTERNAL:
      return I18n.t('SignInSystem.EXTERNAL_TOOLTIP');
    case SignInSystem.BOTH:
      return I18n.t('SignInSystem.BOTH_TOOLTIP');
    default:
      return '';
  }
};

export const isDataTime = datatime => {
  return (datatime !== null && datatime !== -1 && datatime !== '' && datatime !== 0);
};

export const getHbValue = (value, locale) => {
  if (!value) return '';
  switch (value.type) {
    case HBColumnType.NUMBER:
      return get(value, `value.any`, '');
    case HBColumnType.USER_CHOICE:
      return getFioAlmex(get(value, `user`, new UserOrGroup()));
    default:
      return get(value, `value.${locale}`, '');
  }
};