import React from 'react';
import { Modal } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { log } from 'utils/helpers';
import * as Yup from 'yup';

const ChangePassword = (props) => {
  const { hideModal } = props;
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string().required(I18n.t('form.required')),
        newPassword: Yup.string().required(I18n.t('form.required')),
        confirmPassword: Yup.string().required(I18n.t('form.required'))
          .oneOf([Yup.ref('newPassword'), null], I18n.t('ChangePassword.password_not_match'))
      })}
      onSubmit={async (values) => {
        log(values);
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
            name="newPassword"
            label={I18n.t('ChangePassword.newPassword')}
          >
            <Input.Password name="newPassword" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="confirmPassword"
            label={I18n.t('ChangePassword.confirmPassword')}
          >
            <Input.Password name="confirmPassword" />
          </Form.Item>
        </Form>
      </ Modal>}
    </Formik>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(ChangePassword);