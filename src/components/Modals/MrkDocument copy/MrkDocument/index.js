import React from 'react';
import { Modal } from 'antd';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';

const MrkDocument = (props) => {
  const { hideModal, mrkDocument } = props;
  return (
    <Formik
      initialValues={{

      }}
      onSubmit={async (values, { setSubmitting }) => {

      }}
      render={({ handleSubmit, isSubmitting }) => (
        <Modal
          visible={true}
          title={mrkDocument.name}
          onCancel={() => hideModal('MODAL_MRK_DOCUMENT')}
          onOk={handleSubmit}
          okButtonProps={{ loading: isSubmitting }}
        >

        </ Modal>
      )}
    />
  );

};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(MrkDocument);