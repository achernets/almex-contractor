import React from 'react';
import { Modal } from 'antd';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';

const CreateMrkDocument = (props) => {
  const { hideModal } = props;
  return (
    <Formik
      initialValues={{

      }}
      onSubmit={async (values, { setSubmitting }) => {

      }}
    >{({ handleSubmit, isSubmitting }) => (
      <Modal
        visible={true}
        title={I18n.t('CreateMrkDocument.title')}
        onCancel={() => hideModal('MODAL_CREATE_MRK_DOCUMENT')}
        onOk={handleSubmit}
        okButtonProps={{ loading: isSubmitting }}
      >

      </Modal>
    )}
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
export default connect(null, mapDispatchToProps)(CreateMrkDocument);