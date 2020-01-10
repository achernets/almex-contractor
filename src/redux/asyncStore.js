import { setThrift, MrkClientServiceClient } from 'api';
import { reduce } from 'lodash';
import { log } from 'utils/helpers';
import moment from 'moment';

const getInitialState = currentState => {
  return new Promise(async (resolve, reject) => {
    let store = currentState();
    let auth = { ...store.auth };
    try {
      const frontRequest = await fetch(`${process.env.PUBLIC_URL}/web-config.json`);
      const frontSettings = await frontRequest.json();
      await setThrift(frontSettings);
      if (auth.token !== null) {
        try {
          let authenticate = await MrkClientServiceClient.isAuthSessionExpired(
            auth.token
          );
          if (authenticate) auth = {
            ...auth,
            token: null
          };
        } catch (error) {
          log(error);
          auth = {
            ...auth,
            token: null
          };
          localStorage.removeItem('token');
        }
      }
      const DEFAULT_TRANSLATE = localStorage.getItem('lang') || frontSettings.LANG;
      const translate = await fetch(
        `${process.env.PUBLIC_URL}/translates/${DEFAULT_TRANSLATE}.json`
      );
      let translations = {
        [DEFAULT_TRANSLATE]: await translate.json()
      };
      moment.locale(DEFAULT_TRANSLATE);
      const languages = await MrkClientServiceClient.getAllLanguages();
      const settings = await MrkClientServiceClient.getInfo();
      resolve({
        ...store,
        auth,
        settings: {
          ...settings,
          ...frontSettings
        },
        i18n: {
          locale: DEFAULT_TRANSLATE,
          translations,
          // list: [
          //   {
          //     name: 'English',
          //     value: 'en'
          //   },
          //   {
          //     name: 'Русский',
          //     value: 'ru'
          //   },
          //   {
          //     name: 'Қазақша',
          //     value: 'kk'
          //   }
          // ]
          list: reduce(
            languages,
            (array, item, key) => {
              array.push({
                name: item,
                value: key
              });
              return array;
            },
            []
          )
        }
      });
    } catch (error) {
      log(error);
      reject(error);
    }
  });
};

export { getInitialState };
