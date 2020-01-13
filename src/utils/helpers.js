import { isEmpty, upperFirst } from 'lodash';
export const log = (...props) => {
  /* eslint-disable-next-line */
  if (process.env.NODE_ENV === 'development' || window.showLogs) console.log(...props);
};

export const PUBLIC_URL = process.env.PUBLIC_URL;

export const userName = ({ firstName, lastName }) => {
  return `${isEmpty(firstName) ? '' : upperFirst(firstName) + ''} ${isEmpty(lastName) ? '' : upperFirst(lastName)}`;
};