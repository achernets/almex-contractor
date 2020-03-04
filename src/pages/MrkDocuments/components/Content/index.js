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
import { invert } from 'lodash';
import { getSignInSystemText } from 'utils/helpers';
import { Attach, Mark } from 'components/Icons';

const Content = ({ getMrkDocuments, showModal, showPreviewDocument, selectedAttachment, editDocument, mrkDocuments, isSearch, count, page, isFetching }) => {
  useEffect(() => {
    getMrkDocuments();
  }, []);

  const getMarkDocument = (respStatus) => {
    switch (respStatus) {
      case MrkDocumentRespStatus.REQUIRED:
        return <Mark fill={'rgba(250, 173, 20, 0.4)'} stroke={'#FAAD14'} />;
      case MrkDocumentRespStatus.OPTIONAL:
      case MrkDocumentRespStatus.PROHIBITED:
        return <Mark fill={'#fffff'} stroke={'#C4C4C4'} />;
      case MrkDocumentRespStatus.DRAFT:
        return <Mark fill={'rgba(150, 226, 199, 0.3)'} stroke={'#96E2C7'} />;
      case MrkDocumentRespStatus.SEND:
        return <Mark fill={'rgba(92, 194, 103, 0.4)'} stroke={'#5CC267'} />;
      default:
        return <Mark fill={'rgba(196, 196, 196, 0.4)'} stroke={'#C4C4C4'} />;
    }
  };

  return <><Table
    loading={isFetching}
    columns={[
      {
        title: I18n.t('MrkDocument.name'),
        dataIndex: 'name',
        render: (text, { hasAttachments = false, respStatus }) => {
          return <span style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Tooltip title={I18n.t(`MrkDocumentRespStatus.${invert(MrkDocumentRespStatus)[respStatus]}`)}>
              {getMarkDocument(respStatus)}
            </Tooltip>
            <span style={{
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginLeft: 4,
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
        width: 120,
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.extCameFrom'),
        dataIndex: 'extCameFrom',
        width: 150,
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.extAuthorName'),
        dataIndex: 'extAuthorName',
        width: 120,
        ellipsis: true
      },
      // {
      //   title: I18n.t('MrkDocument.extAuthorEmail'),
      //   dataIndex: 'extAuthorEmail',
      //   ellipsis: true
      // },
      // {
      //   title: I18n.t('MrkDocument.patternName'),
      //   dataIndex: 'patternName',
      //   ellipsis: true
      // },
      {
        title: I18n.t('MrkDocument.createDate'),
        key: 'createDate',
        width: 100,
        render: ({ createDate }) => moment(createDate).format('DD.MM.YYYY'),
        ellipsis: true
      },
      {
        title: I18n.t('MrkDocument.signInSystem'),
        dataIndex: 'signInSystem',
        ellipsis: false,
        width: 140,
        render: (signInSystem) => {
          switch (signInSystem) {
            case SignInSystem.ALMEX:
              return <span style={{
                color: '#F4B435',
                display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>{getSignInSystemText(signInSystem)}</span>;
            case SignInSystem.EXTERNAL:
              return <span style={{
                color: '#F4B435', display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>{getSignInSystemText(signInSystem)}</span>;
            case SignInSystem.BOTH:
              return <span style={{
                color: '#61B039', display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>{getSignInSystemText(signInSystem)}</span>;
            default:
              return '';
          }
        }
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