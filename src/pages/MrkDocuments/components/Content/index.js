import React, { useEffect } from 'react';
import Table from 'components/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMrkDocuments, removeDocument } from 'redux/actions/mrkDocuments';
import { showPreviewDocument, selectedAttachment } from 'redux/actions/mrkDocument';
import { editDocument } from 'redux/actions/Modal/createMrkDocument';
import { PAGE_SIZE } from 'constants/table';
import { I18n } from 'react-redux-i18n';
import Empty from 'components/Empty';
import { Button, Typography } from 'antd';
import classnames from 'classnames';
import RightMrkDocumentInfo from 'components/RightMrkDocumentInfo';
import LeftOnlyOffice from 'components/LeftOnlyOffice';
import { actions } from 'react-redux-modals';
import { DOCUMENTS_DRAFT, DOCUMENTS_INPUT, DOCUMENTS_OUTPUT } from 'utils/columns';

const Content = ({ getMrkDocuments, removeDocument, mrkDocumentType, showModal, showPreviewDocument, selectedAttachment, editDocument, mrkDocuments, isSearch, count, page, isFetching }) => {
  useEffect(() => {
    getMrkDocuments();
  }, []);

  const getColumns = () => {
    switch (mrkDocumentType) {
      case MrkDocumentType.DRAFT:
        return DOCUMENTS_DRAFT;
      case MrkDocumentType.INPUT:
        return DOCUMENTS_INPUT;
      case MrkDocumentType.OUTPUT:
        return DOCUMENTS_OUTPUT;
      default:
        return DOCUMENTS_DRAFT;
    }
  };

  const columns = getColumns();

  return <><Table
    loading={isFetching}
    columns={columns.map(item => {
      let newItem = { ...item };
      if (newItem.title !== null) newItem.title = I18n.t(newItem.title);
      if (newItem.key === 'remove') newItem.onCell = (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation();
            removeDocument(record);
          }
        };
      };
      return newItem;
    })}
    dataSource={mrkDocuments}
    pagination={{
      simple: true,
      defaultPageSize: PAGE_SIZE,
      total: count,
      current: page,
      onChange: (props) => getMrkDocuments(props)
    }}

    onRow={(record) => {
      return {
        className: classnames({ 'not_viewed': !record.viewed }),
        onClick: () => {
          record.type === MrkDocumentType.DRAFT ? editDocument(record.id) : showPreviewDocument(record);
        }
      };
    }}
    locale={{
      emptyText: isSearch ? <Empty
        description={I18n.t('MrkDocuments.no_data_search')}
      >
      </Empty> : <Empty
        imageStyle={{
          height: 0
        }}
        image={null}
        description={<Typography.Text>{I18n.t('MrkDocuments.no_data')}</Typography.Text>}
      >
          <Button type="primary" onClick={() => showModal('MODAL_CREATE_MRK_DOCUMENT', {
            newMrkDocument: true,
            parentId: null,
            extRespPatternId: null,
            extRespReq: MrkDocResponceType.OPTIONAL_NEW
          })}>{I18n.t('MrkDocuments.create_empty')}</Button>
        </Empty>,
    }}
  />
    <LeftOnlyOffice close={() => selectedAttachment(null)} />
    <RightMrkDocumentInfo />
  </>;
};


const mapStateToProps = state => ({
  mrkDocuments: state.mrkDocuments.mrkDocuments,
  count: state.mrkDocuments.count,
  page: state.mrkDocuments.page,
  mrkDocumentType: state.mrkDocuments.mrkDocumentType,
  isSearch: state.mrkDocuments.isSearch,
  isFetching: state.mrkDocuments.isFetching
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMrkDocuments,
      editDocument,
      showPreviewDocument,
      selectedAttachment,
      removeDocument,
      showModal: actions.showModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Content);