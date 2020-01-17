import React, { useEffect } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { Button, Row, Col, Typography } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { getMrkDocumentData, sendDocument, initState } from 'redux/actions/Modal/mrkDocument';
import Information from './components/Information';
import Loader from 'components/Loader';
import * as styles from './mrkDocument.module.scss';
const MrkDocument = ({
  hideModal,
  showModal,
  getMrkDocumentData,
  sendDocument,
  initState,
  mrkDocumentData,
  isFetching,
  isFetchingSend,
  mrkDocument
}) => {

  useEffect(() => {
    getMrkDocumentData(mrkDocument.id);
    return () => initState();
  }, []);

  const Footer = () => {
    const CloseButton = <Button key="close" onClick={() => hideModal('MODAL_MRK_DOCUMENT')} >
      {I18n.t('common.close')}
    </Button>;
    switch (get(mrkDocumentData, 'document.type', mrkDocument.type)) {
      case MrkDocumentType.DRAFT:
        return [<Button icon="lock" key="send_ecp" loading={isFetchingSend} type="primary" onClick={() => sendDocument()}>
          {I18n.t('CreateMrkDocument.send_doc_ecp')}
        </Button>,
        <Button key="send" loading={isFetchingSend} onClick={() => sendDocument()}>
          {I18n.t('CreateMrkDocument.send_doc')}
        </Button>,
          CloseButton];
      case MrkDocumentType.INPUT:
        return [
          <Button key="answer" type="primary" onClick={() => showModal('MODAL_CREATE_MRK_DOCUMENT')}>
            {I18n.t('MrkDocument.send_answer')}
          </Button>,
          CloseButton
        ];
      default:
        return [CloseButton];
    }
  };
  return (
    <Modal
      visible={true}
      width={710}
      centered
      bodyStyle={{
        height: 'calc(100vh - 180px)',
        overflowY: 'auto',
        padding: 24
      }}
      className={styles.modal}
      maskClosable={false}
      title={<Row>
        <Col span={19}>
          <Typography.Text strong ellipsis>{mrkDocument.name}</Typography.Text>
        </Col>
        <Col span={5}>
          <Typography.Text>{moment(mrkDocument.createDate).format('DD.MM.YYYY HH:mm')}</Typography.Text>
        </Col>
      </Row>}
      onCancel={() => hideModal('MODAL_MRK_DOCUMENT')}
      onOk={() => { }}
      footer={Footer()}
    >
      {isFetching && <Loader />}
      <Information mrkDocumentData={mrkDocumentData} />
    </Modal>
  );

};
const mapStateToProps = state => ({
  mrkDocumentData: state.modal.mrkDocument.mrkDocumentData,
  isFetching: state.modal.mrkDocument.isFetching,
  isFetchingSend: state.modal.mrkDocument.isFetchingSend
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal,
      showModal: actions.showModal,
      getMrkDocumentData,
      sendDocument,
      initState
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MrkDocument);