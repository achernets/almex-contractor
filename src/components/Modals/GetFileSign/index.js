import React, { } from 'react';
import { Modal } from 'components/Modals';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import { Upload, Button, Form as AForm, notification } from 'antd';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { fileReader, log } from 'utils/helpers';
import { getCertificatFromFile } from 'utils/pkcs12';
import * as Yup from 'yup';

const GetFileSign = ({ hideModal, submitModal, }) => {
  return (
    <Formik
      initialValues={{
        file: null,
        password: 'Abenov13',
        fileList: []
      }}
      validationSchema={Yup.object({
        file: Yup.string().nullable().required(I18n.t('form.required')),
        password: Yup.string().required(I18n.t('form.required'))
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const certificate = await getCertificatFromFile(values.file, values.password);
          submitModal(certificate);
          setSubmitting(false);
          hideModal('MODAL_FILE_SIGN');
        } catch (error) {
          log('getCertificatFromFile', error);
          notification.error({
            key: 'getCertificatFromFile',
            message: I18n.t('common.error'),
            description: I18n.t(`errors.${error.code}`)
          });
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, setValues, values, submitCount, isSubmitting, errors }) => <Modal
        visible={true}
        centered
        maskClosable={false}
        title={I18n.t('GetFileSign.title')}
        onCancel={() => hideModal('MODAL_FILE_SIGN')}
        onOk={handleSubmit}
        okButtonProps={{ loading: isSubmitting }}
        okText={I18n.t('common.next')}
        cancelText={I18n.t('common.cancel')}
      >
        <Form layout={'horizontal'}>
          <AForm.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            label={I18n.t('GetFileSign.file')}
          >
            <Upload fileList={values.fileList} multiple={false}
              onRemove={() => setValues({ ...values, fileList: [], file: null })}
              beforeUpload={(file, fileList) => {
                const reader = async (file) => {
                  const readFile = await fileReader(file);
                  setValues({ ...values, fileList: fileList, file: readFile });
                };
                reader(file);
                return false;
              }}>
              <Button type={submitCount > 0 && errors.file ? 'danger' : 'default'} icon="paper-clip">{I18n.t('common.add_file')}</Button>
            </Upload>
          </AForm.Item>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="password"
            label={I18n.t('GetFileSign.password')}
          >
            <Input.Password autoComplete="false" name="password" />
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
export default connect(mapStateToProps, mapDispatchToProps)(GetFileSign);