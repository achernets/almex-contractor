import React, { useEffect } from 'react';
import Table from 'components/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMrkDocuments, showPreviewDocument, selectedAttachment } from 'redux/actions/mrkDocuments';
import { editDocument } from 'redux/actions/Modal/createMrkDocument';
import { PAGE_SIZE } from 'constants/table';
import { I18n } from 'react-redux-i18n';
import Empty from 'components/Empty';
import { Button, Typography } from 'antd';
import moment from 'moment';
import RightMrkDocumentInfo from 'components/RightMrkDocumentInfo';
import LeftOnlyOffice from 'components/LeftOnlyOffice';
import { actions } from 'react-redux-modals';

const Content = ({ getMrkDocuments, showModal, showPreviewDocument, selectedAttachment, editDocument, mrkDocuments, isSearch, count, page, isFetching }) => {
  useEffect(() => {
    getMrkDocuments();
  }, []);
  return <><Table
    loading={isFetching}
    columns={[
      {
        title: I18n.t('MrkDocuments.patternName'),
        dataIndex: 'patternName',
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocuments.name'),
        dataIndex: 'name',
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocuments.createDate'),
        key: 'createDate',
        render: ({ createDate }) => moment(createDate).format('DD.MM.YYYY HH:mm:ss')
      },
    ]}
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
        onClick: () => {
          record.type === MrkDocumentType.DRAFT ? editDocument(record.id) : showPreviewDocument(record);
        },
        // onDoubleClick: () => {
        //   record.type === MrkDocumentType.DRAFT ? editDocument(record.id) : showModal('MODAL_MRK_DOCUMENT', {
        //     mrkDocument: record
        //   });
        // }
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
            mrkDocument: null
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
      showModal: actions.showModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Content);