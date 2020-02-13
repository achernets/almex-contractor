import { isEmpty, upperFirst, get, uniqueId } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { notification } from 'antd';
import moment from 'moment';
import store from 'redux/store';

export const log = (...props) => {
  /* eslint-disable-next-line */
  if (process.env.NODE_ENV === 'development' || window.showLogs) console.log(...props);
};

export const PUBLIC_URL = process.env.PUBLIC_URL;

export const userName = ({ firstName, lastName }) => {
  return `${isEmpty(firstName) ? '' : upperFirst(firstName) + ''} ${isEmpty(lastName) ? '' : upperFirst(lastName)}`;
};

export const getFio = ({ firstName, lastName, middleName }) => {
  return `${isEmpty(lastName) ? '' : upperFirst(lastName)} ${isEmpty(firstName) ? '' : upperFirst(firstName)[0] + '.'}${isEmpty(middleName) ? '' : upperFirst(middleName)[0] + '.'}`;
};

export const NotificationError = (error, key = uniqueId('notification_')) => {
  if (error.preconditionExceptionKey) notification.error({
    key,
    message: error.preconditionExceptionKey,
    description: error.message
  });
  log(key, error);
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

export const getAttachmentUrl = (mrkAttachment, type = AttachmentType.ORIGINAL) => {
  const {
    auth: { token },
    settings: { THRIFT }
  } = store.getState();
  return `${THRIFT.URL}/${THRIFT.API}/attachment?token=${token}&id=${mrkAttachment.id}&type=${type}`;
};

export const getAttachmentName = ({ fileName }) => {
  return fileName.substr(0, fileName.lastIndexOf('.'));
};

export const getAttachmentExt = ({ fileName }) => {
  return fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
};