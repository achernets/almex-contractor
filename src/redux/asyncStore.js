import { MrkClientServiceClient } from 'api';
import moment from 'moment';

const getInitialState = currentState => {
  return new Promise(async (resolve, reject) => {
    let store = currentState();
    let auth = { ...store.auth };
    try {
      // if (store.auth.token !== null) {
      //   try {
      //     let authenticate = await AuthServiceClient.refreshAuthSession(
      //       store.auth.token
      //     );
      //     let accounts = await UserManagementServiceClient.getAccounts(
      //       authenticate.id,
      //       null
      //     );
      //     let delegates = await UserManagementServiceClient.getAllClientsForDelegate(
      //       localStorage.getItem('originalUserToken') || authenticate.id,
      //       authenticate.delegateClientInfo !== null
      //         ? authenticate.delegateClientInfo.id
      //         : authenticate.clientInfo.id,
      //       null
      //     );
      //     auth = {
      //       token: authenticate.id,
      //       user: authenticate,
      //       accounts,
      //       delegates
      //     };
      //   } catch (error) {
      //     auth = {
      //       ...auth,
      //       token: null
      //     };
      //     localStorage.removeItem('token');
      //     localStorage.removeItem('originalUserToken');
      //   }
      // }
      // const languages = await AuthServiceClient.getAllLanguages();
      const settings = await MrkClientServiceClient.getInfo();
      const frontRequest = await fetch('/web-config.json');
      const frontSettings = await frontRequest.json();
      const DEFAULT_TRANSLATE =
        localStorage.getItem('lang') || frontSettings.LANG;
      const translate = await fetch(
        `/translates/${DEFAULT_TRANSLATE}.json`
      );
      let translations = {
        [DEFAULT_TRANSLATE]: await translate.json()
      };
      moment.locale(DEFAULT_TRANSLATE);
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
          list: [
            {
              name: 'English',
              value: 'en'
            },
            {
              name: 'Русский',
              value: 'ru'
            },
            {
              name: 'Қазақша',
              value: 'kk'
            }
          ]
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { getInitialState };
