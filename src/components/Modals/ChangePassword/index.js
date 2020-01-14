import React from 'react';
import { Modal, notification } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { log } from 'utils/helpers';
import * as Yup from 'yup';
import { MrkClientServiceClient } from 'api';

const ChangePassword = ({ hideModal, token }) => {
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        password: '',
        confirmation: ''
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string().required(I18n.t('form.required')),
        password: Yup.string().required(I18n.t('form.required')),
        confirmation: Yup.string().required(I18n.t('form.required'))
          .oneOf([Yup.ref('password'), null], I18n.t('ChangePassword.password_not_match'))
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await MrkClientServiceClient.changePassword(token, { ...values });
          hideModal('MODAL_CHANGE_PASSWORD');
        } catch (error) {
          notification.error({
            key: 'changePassword',
            message: error.preconditionExceptionKey,
            description: error.message
          });
          log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting }) => <Modal
        visible={true}
        centered
        maskClosable={false}
        title={I18n.t('ChangePassword.title')}
        onCancel={() => hideModal('MODAL_CHANGE_PASSWORD')}
        onOk={handleSubmit}
        okButtonProps={{ loading: isSubmitting }}
        okText={I18n.t('common.save')}
        cancelText={I18n.t('common.cancel')}
      >
        <Form layout={'horizontal'}>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="oldPassword"
            label={I18n.t('ChangePassword.oldPassword')}
          >
            <Input.Password name="oldPassword" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="password"
            label={I18n.t('ChangePassword.password')}
          >
            <Input.Password name="password" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="confirmation"
            label={I18n.t('ChangePassword.confirmation')}
          >
            <Input.Password name="confirmation" />
          </Form.Item>
        </Form>
      </ Modal>}
    </Formik>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);