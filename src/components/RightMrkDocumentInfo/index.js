import React from 'react';
import { Drawer, Typography, Row, Button, Col } from 'antd';
import { MrkDocumentView } from './components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMrkDocument, selectedAttachment } from 'redux/actions/mrkDocument';
import Loader from 'components/Loader';
import { get } from 'lodash';
import { actions } from 'react-redux-modals';
import { Close } from 'components/Icons';

const RightMrkDocumentInfo = ({ selectedAttachment, mrkDocumentData, mrkAttachment, isFetching, hideMrkDocument, showModal }) => {
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
      <Col span={24} style={{ textAlign: 'center' }}>
        <Typography.Text style={{ color: '#262626', fontFamily: 'SFUIText Medium', fontSize: 16 }} >{mrkDocumentData.document.patternName}</Typography.Text>
      </Col>
      <Col span={24}>
        <Typography.Paragraph style={{ color: '#595959', fontFamily: 'SFUIText Regular', marginBottom: 'unset' }} ellipsis={{ rows: 2, expandable: true }}>{mrkDocumentData.document.name}</Typography.Paragraph>
      </Col>
      <MrkDocumentView
        mrkDocumentData={mrkDocumentData}
        mrkAttachment={mrkAttachment}
        selectedAttachment={selectedAttachment}
      />
      <Col span={24} style={{ textAlign: 'right' }}>
        {
          get(mrkDocumentData, 'document.type', null) === MrkDocumentType.INPUT &&
          <Button
            onClick={() => showModal('MODAL_CREATE_MRK_DOCUMENT', {
              parentId: get(mrkDocumentData, 'document.id', null)
            })}
            type={'primary'}
            size={'large'}
            style={{ marginRight: 8 }}
          >
            Сформировать ответ
            </Button>
        }
        <Button size={'large'} onClick={hideMrkDocument}>Закрыть</Button>
      </Col>
    </Row>}

  </Drawer>;

};
const mapStateToProps = state => ({
  mrkDocumentData: state.mrkDocument.mrkDocumentData,
  mrkAttachment: state.mrkDocument.mrkAttachment,
  isFetching: state.mrkDocument.isFetching
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideMrkDocument,
      selectedAttachment,
      showModal: actions.showModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RightMrkDocumentInfo);