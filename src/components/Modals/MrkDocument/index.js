import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';

const MrkDocument = (props) => {
  const { hideModal, mrkDocument } = props;
  return (

    <Modal
      visible={true}
      title={mrkDocument.name}
      onCancel={() => hideModal('MODAL_MRK_DOCUMENT')}
      onOk={() => { }}
    >

    </ Modal>
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