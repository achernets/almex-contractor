import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as styles from './languages.module.scss';
import { notification, Typography, Col } from 'antd';
import moment from 'moment';
import { PUBLIC_URL, getLocaleCode } from 'utils/helpers';
import { loadTranslations, setLocale, I18n } from 'react-redux-i18n';

class LangItem extends Component {
  setlang = async lang => {
    const { locale } = this.props;
    if (locale === lang.value) return null;
    try {
      const request = await fetch(`${PUBLIC_URL}/translates/${lang.value}.json`);
      const translates = await request.json();
      const antdLocales = await getLocaleCode(lang.value);
      this.props.loadTranslations({
        [lang.value]: {
          antd: antdLocales.default,
          ...translates
        }
      });
      this.props.setLocale(lang.value);
      localStorage.setItem('lang', lang.value);
      moment.locale(lang.value);
    } catch (error) {
      notification.error({
        key: 'locale_not_found',
        message: I18n.t('common.error'),
        description: I18n.t('SignIn.locale_not_found')
      });
    }
  };

  render() {
    const { locale, language } = this.props;
    return (
      <Col>
        <Typography.Text
          onClick={() => this.setlang(language)}
          className={classnames(
            styles.item,
            language.value === locale ? styles.active : null
          )}
        >
          {language.value}
        </Typography.Text>
      </Col>
    );
  }
}
const mapStateToProps = state => ({
  locale: state.i18n.locale
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadTranslations,
      setLocale
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LangItem);
