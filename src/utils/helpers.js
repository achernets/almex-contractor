export const log = (...props) => {
  /* eslint-disable-next-line */
  if (process.env.NODE_ENV === 'development') console.log(...props);
};

export const PUBLIC_URL = process.env.PUBLIC_URL;