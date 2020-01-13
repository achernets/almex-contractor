import React, { useEffect } from 'react';
import Table from 'components/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMrkDocuments } from 'redux/actions/mrkDocuments';
import { PAGE_SIZE } from 'constants/table';
import { I18n } from 'react-redux-i18n';
import Empty from 'components/Empty';
import { Button, Typography } from 'antd';
import moment from 'moment';
import { actions } from 'react-redux-modals';

const Content = ({ getMrkDocuments, showModal, mrkDocuments, count, page, isFetching }) => {
  useEffect(() => {
    getMrkDocuments();
  }, []);
  return <Table
    loading={isFetching}
    columns={[
      {
        title: I18n.t('MrkDocuments.patternName'),
        dataIndex: 'patternName',
      },
      {
        title: I18n.t('MrkDocuments.name'),
        dataIndex: 'name',
      },
      {
        title: I18n.t('MrkDocuments.createDate'),
        key: 'createDate',
        render: text => moment(text).format('DD.MM.YYYY'),
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
        onClick: () => showModal('MODAL_MRK_DOCUMENT', {
          mrkDocument: record
        })
      };
    }}
    locale={{
      emptyText: <Empty
        imageStyle={{
          height: 0
        }}
        image={null}
        description={<Typography.Text style={{ fontSize: 24 }} strong>{I18n.t('MrkDocuments.no_data')}</Typography.Text>}
      >
        <Button type="primary" onClick={() => showModal('MODAL_CREATE_MRK_DOCUMENT', {
          mrkDocument: null
        })}>{I18n.t('MrkDocuments.create_empty')}</Button>
      </Empty>,
    }}
  />;
};


const mapStateToProps = state => ({
  mrkDocuments: state.mrkDocuments.mrkDocuments,
  count: state.mrkDocuments.count,
  page: state.mrkDocuments.page,
  isFetching: state.mrkDocuments.isFetching
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMrkDocuments,
      showModal: actions.showModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Content);