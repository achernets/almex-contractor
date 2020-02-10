import React, { useEffect } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-modals';
import { Button, Row, Col, Typography, Icon } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { getMrkDocumentData, sendDocument, changeShowChain, changeChain, initState } from 'redux/actions/Modal/mrkDocument';
import Information from './components/Information';
import Chain from './components/Chain';
import Loader from 'components/Loader';
import Tooltip from 'components/Tooltip';
import * as styles from './mrkDocument.module.scss';
const MrkDocument = ({
  hideModal,
  showModal,
  getMrkDocumentData,
  sendDocument,
  changeShowChain,
  changeChain,
  initState,
  mrkDocumentData,
  isFetching,
  isFetchingSend,
  mrkDocument,
  showChain,
  loadChainId,
  chain,
  activeChain
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
        return [
          <Button icon="lock" key="send_ecp" loading={isFetchingSend} type="primary" onClick={() => sendDocument()}>
            {I18n.t('CreateMrkDocument.send_doc_ecp')}
          </Button>,
          <Button key="send" loading={isFetchingSend} onClick={() => sendDocument()}>
            {I18n.t('CreateMrkDocument.send_doc')}
          </Button>,
          CloseButton];
      case MrkDocumentType.INPUT:
        return [
          <Button key="answer" type="primary" onClick={() => showModal('MODAL_CREATE_MRK_DOCUMENT', {
            parentId: get(mrkDocumentData, 'document.id', null),
            extRespPatternId: get(mrkDocumentData, 'extRespPatternId.id', null)
          })}>
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
        padding: '12px 24px 12px 24px'
      }}
      className={styles.modal}
      maskClosable={false}
      title={<Row>
        <Col span={19}>
          <Typography.Text strong ellipsis>
            {get(mrkDocumentData, 'document.groupNumber', mrkDocument.groupNumber) !== null &&
              <Tooltip title={I18n.t(showChain ? 'MrkDocument.hide_chain' : 'MrkDocument.show_chain')} placement="bottom">
                <Icon type="link" onClick={() => changeShowChain(!showChain)} />
              </Tooltip>}
            {get(mrkDocumentData, 'document.name', mrkDocument.name)}
          </Typography.Text>
        </Col>
        <Col span={5}>
          <Typography.Text>{moment(get(mrkDocumentData, 'document.createDate', mrkDocument.createDate)).format('DD.MM.YYYY HH:mm')}</Typography.Text>
        </Col>
      </Row>}
      onCancel={() => hideModal('MODAL_MRK_DOCUMENT')}
      onOk={() => { }}
      footer={Footer()}
    >
      {isFetching && <Loader />}
      {!showChain && <Information mrkDocumentData={mrkDocumentData} />}
      {showChain && <Chain activeChain={activeChain} chain={chain} changeChain={changeChain} loadChainId={loadChainId} />}
    </Modal>
  );

};
const mapStateToProps = state => ({
  mrkDocumentData: state.modal.mrkDocument.mrkDocumentData,
  showChain: state.modal.mrkDocument.showChain,
  loadChainId: state.modal.mrkDocument.loadChainId,
  chain: state.modal.mrkDocument.chain,
  activeChain: state.modal.mrkDocument.activeChain,
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
      changeShowChain,
      changeChain,
      initState
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MrkDocument);