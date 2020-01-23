import React from 'react';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import { Button, Row, Col, Icon } from 'antd';
import { I18n } from 'react-redux-i18n';
import { login } from 'redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';

const FormData = ({ login, token, isFetching }) => {

  if (token !== null) return <Redirect
    to={{
      pathname: '/'
    }}
  />;

  return <Formik
    initialValues={{ login: '', password: '' }}
    validationSchema={Yup.object().shape({
      login: Yup.string().required(I18n.t('form.required')),
      password: Yup.string().required(I18n.t('form.required'))
    })}
    onSubmit={(values) => {
      login(values);
    }}
  >
    {() => (
      <Form style={{ width: 260 }}>
        <Form.Item name="login" >
          <Input name="login" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={I18n.t('SignIn.login')} size={'large'} />
        </Form.Item>
        <Form.Item name="password" extra={null} >
          <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name="password" placeholder={I18n.t('SignIn.password')} size={'large'} />
        </Form.Item>
        <Row gutter={[12, 12]}>
          <Col>
            <Button
              type="primary"
              block
              size={'large'}
              htmlType="submit"
              loading={isFetching}
            >
              {I18n.t('SignIn.sign_in')}
            </Button>
          </Col>
          <Col>
            <Button
              block
              size={'large'}
              htmlType="button"
              href={'/signUp'}
            >
              {I18n.t('SignIn.sign_up')}
            </Button>
          </Col>
        </Row>
      </Form>
    )}
  </Formik>;
};

const mapStateToProps = state => ({
  token: state.auth.token,
  locale: state.i18n.locale,
  isFetching: state.auth.isFetching
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(FormData);