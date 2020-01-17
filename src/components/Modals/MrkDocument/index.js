import React, { useState, useEffect } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { log, getContentItemValue } from 'utils/helpers';
import { Button, Row, Col, Typography } from 'antd';
import { get, map } from 'lodash';
import moment from 'moment';
import Attachment from 'components/Attachment';
import { MrkClientServiceClient } from 'api';
import * as styles from './mrkDocument.module.scss';
const MrkDocument = ({ hideModal, showModal, token, mrkDocument }) => {
  const [mrkDocumentData, setMrkDocumentData] = useState(null);
  const getMrkDocumentData = async () => {
    const result = await MrkClientServiceClient.getMrkDocumentData(token, mrkDocument.id);
    setMrkDocumentData(result);
  };
  const sendDocument = async (ecp) => {
    if (ecp) log('ecp');
    //await MrkClientServiceClient.sendDocument(token, mrkDocumentData.document.id);
  };
  useEffect(() => {
    getMrkDocumentData();
  }, []);
  log(mrkDocumentData);
  const Footer = () => {
    const CloseButton = <Button key="close" onClick={() => hideModal('MODAL_MRK_DOCUMENT')} >
      {I18n.t('common.close')}
    </Button>;
    switch (get(mrkDocumentData, 'document.type', mrkDocument.type)) {
      case MrkDocumentType.DRAFT:
        return [<Button icon="lock" key="send_ecp" type="primary" onClick={() => sendDocument(true)}>
          {I18n.t('CreateMrkDocument.send_doc_ecp')}
        </Button>,
        <Button key="send" onClick={() => sendDocument(false)}>
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
      {get(mrkDocumentData, 'items', []).map(item =>
        <Row key={item.id} type="flex" gutter={[24, 48]}>
          <Col span={8}>
            <Typography.Text ellipsis>{item.oName}:</Typography.Text>
          </Col>
          <Col span={16}>
            <Typography.Text>{getContentItemValue(item)}</Typography.Text>
          </Col>
        </Row>
      )}
      {get(mrkDocumentData, 'atts', []).length > 0 && <Row type="flex" gutter={[24, 48]}>
        <Col span={8}>
          <Typography.Text strong ellipsis>{I18n.t('common.attachments')}</Typography.Text>
        </Col>
        <Col span={16}>
          {map(mrkDocumentData.atts, item => <Attachment attachment={item} key={item.id} />)}
        </Col>
      </Row>}
    </ Modal>
  );

};
const mapStateToProps = state => ({
  token: state.auth.token
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideModal: actions.hideModal,
      showModal: actions.showModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MrkDocument);