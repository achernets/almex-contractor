import React, { useEffect } from 'react';
import Table from 'components/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMrkDocuments } from 'redux/actions/mrkDocuments';
import { showPreviewDocument, selectedAttachment } from 'redux/actions/mrkDocument';
import { editDocument } from 'redux/actions/Modal/createMrkDocument';
import { PAGE_SIZE } from 'constants/table';
import { I18n } from 'react-redux-i18n';
import Empty from 'components/Empty';
import { Button, Typography, Tooltip } from 'antd';
import moment from 'moment';
import classnames from 'classnames';
import RightMrkDocumentInfo from 'components/RightMrkDocumentInfo';
import LeftOnlyOffice from 'components/LeftOnlyOffice';
import { actions } from 'react-redux-modals';
import { Attach, Ecp } from 'components/Icons';

const Content = ({ getMrkDocuments, showModal, showPreviewDocument, selectedAttachment, editDocument, mrkDocuments, isSearch, count, page, isFetching }) => {
  useEffect(() => {
    getMrkDocuments();
  }, []);
  return <><Table
    loading={isFetching}
    columns={[
      {
        title: null,
        dataIndex: 'signInSystem',
        width: 34,
        align: 'center',
        render: (signInSystem) => {
          switch (signInSystem) {
            case SignInSystem.ALMEX:
              return <Tooltip placement={'right'} title={I18n.t('SignInSystem.ALMEX_TOOLTIP')}>
                <Ecp style={{ height: 18, width: 18 }} fill={'#faad14'} />
              </Tooltip>;
            case SignInSystem.EXTERNAL:
              return <Tooltip placement={'right'} title={I18n.t('SignInSystem.EXTERNAL_TOOLTIP')}>
                <Ecp style={{ height: 18, width: 18 }} fill={'#8c8c8c'} />
              </Tooltip>;
            case SignInSystem.BOTH:
              return <Tooltip placement={'right'} title={I18n.t('SignInSystem.BOTH_TOOLTIP')}>
                <Ecp style={{ height: 18, width: 18 }} fill={'#1890ff'} />
              </Tooltip>;
            default:
              return '';
          }
        }
      },
      {
        title: I18n.t('MrkDocument.name'),
        dataIndex: 'name',
        render: (text, { hasAttachments = false }) => {
          return <span style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginRight: 4
            }}>{text}</span>
            {hasAttachments && <Tooltip title={I18n.t('MrkDocument.hasAttachments')}>
              <Attach />
            </Tooltip>}
          </span>;
        },
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.extNumber'),
        dataIndex: 'extNumber',
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.extCameFrom'),
        dataIndex: 'extCameFrom',
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.extAuthorName'),
        dataIndex: 'extAuthorName',
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.extAuthorEmail'),
        dataIndex: 'extAuthorEmail',
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.patternName'),
        dataIndex: 'patternName',
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.createDate'),
        key: 'createDate',
        width: 140,
        render: ({ createDate }) => moment(createDate).format('DD.MM.YYYY HH:mm'),
        ellipsis: true
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
            parentId: null,
            extRespPatternId: null
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