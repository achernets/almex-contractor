import React from 'react';
import { Drawer, Typography, Row, Button, Col, Tooltip } from 'antd';
import { MrkDocumentView, MrkDocumentChain } from './components';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { hideMrkDocument, toogleView, selectedAttachment } from 'redux/actions/mrkDocument';
import Loader from 'components/Loader';
import { get } from 'lodash';
import { actions } from 'react-redux-modals';
import { Close, Chain } from 'components/Icons';
import * as styles from './right-preview.module.scss';

const RightMrkDocumentInfo = ({ selectedAttachment, mrkDocumentData, mrkAttachment, isFetching, hideMrkDocument, showModal, toogleView, showChain }) => {
  return <Drawer
    width={496}
    placement={'right'}
    closable={false}
    mask={false}
    onClose={false}
    visible={mrkDocumentData !== null || isFetching}
  >
    {isFetching && <Loader />}
    <Close
      onClick={hideMrkDocument}
    />
    {mrkDocumentData !== null && <Row gutter={[0, 16]} justify={'center'} align={'middle'}>
      <Col span={24} className={styles.tc}>
        {get(mrkDocumentData, 'document.groupNumber', null) !== null &&
          <Tooltip title={I18n.t(showChain ? 'MrkDocument.hide_chain' : 'MrkDocument.show_chain')} placement="bottom">
            <Chain onClick={toogleView} />
          </Tooltip>}
        <Typography.Text className={styles.title} >{mrkDocumentData.document.patternName}</Typography.Text>
      </Col>
      {showChain ?
        <MrkDocumentChain
          mrkAttachment={mrkAttachment}
          selectedAttachment={selectedAttachment}
        /> :
        <>
          <Col span={24}>
            <Typography.Paragraph className={styles.subtitle} ellipsis={{ rows: 2, expandable: true }}>{mrkDocumentData.document.name}</Typography.Paragraph>
          </Col>
          <MrkDocumentView
            mrkDocumentData={mrkDocumentData}
            mrkAttachment={mrkAttachment}
            selectedAttachment={selectedAttachment}
          />
        </>
      }
      <Col span={24}>
        <Row gutter={[8, 0]} type="flex" align="middle" justify="end">
          {
            get(mrkDocumentData, 'document.type', null) === MrkDocumentType.INPUT && <Col>
              <Button
                onClick={() => showModal('MODAL_CREATE_MRK_DOCUMENT', {
                  parentId: get(mrkDocumentData, 'document.id', null),
                  extRespPatternId: get(mrkDocumentData, 'extRespPatternId.id', null)
                })}
                type={'primary'}
              >
                Сформировать ответ
              </Button>
            </Col>
          }
          <Col>
            <Button onClick={hideMrkDocument}>Закрыть</Button>
          </Col>
        </Row>
      </Col>
    </Row>}
  </Drawer>;
};

const mapStateToProps = state => ({
  mrkDocumentData: state.mrkDocument.mrkDocumentData,
  mrkAttachment: state.mrkDocument.mrkAttachment,
  isFetching: state.mrkDocument.isFetching,
  showChain: state.mrkDocument.showChain
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideMrkDocument,
      selectedAttachment,
      toogleView,
      showModal: actions.showModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RightMrkDocumentInfo);