import React from 'react';
import { Drawer, Typography, Row, Button, Col, Icon } from 'antd';
import { MrkDocumentView } from './components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hidePreviewDocument, selectedAttachment } from 'redux/actions/mrkDocuments';
import Loader from 'components/Loader';
import { get } from 'lodash';
import { actions } from 'react-redux-modals';

const RightMrkDocumentInfo = ({ selectedAttachment, placement = 'right', previewDocument, mrkDocumentData, mrkAttachment, mrkDocumentDataIsFetching, hidePreviewDocument, showModal }) => {
  //console.log(mrkDocument)
  //const { document, items, atts } = mrkDocumentData;
  return <Drawer
    width={496}
    placement={placement}
    closable={false}
    mask={false}
    onClose={false}
    visible={previewDocument}
  >
    {mrkDocumentDataIsFetching && <Loader />}
    <Icon type={'close'}
      onClick={hidePreviewDocument}
      style={{ color: '#bfbfbf', position: 'absolute', left: 4, top: 4 }} />
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
        <Button size={'large'} onClick={hidePreviewDocument}>Закрыть</Button>
      </Col>
    </Row>}

  </Drawer>;

};
const mapStateToProps = state => ({
  mrkDocumentData: state.mrkDocuments.mrkDocumentData,
  mrkAttachment: state.mrkDocuments.mrkAttachment,
  mrkDocumentDataIsFetching: state.mrkDocuments.mrkDocumentDataIsFetching,
  previewDocument: state.mrkDocuments.previewDocument
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hidePreviewDocument,
      selectedAttachment,
      showModal: actions.showModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RightMrkDocumentInfo);