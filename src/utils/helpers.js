import { isEmpty, upperFirst, uniqueId } from 'lodash';
import { notification } from 'antd';

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