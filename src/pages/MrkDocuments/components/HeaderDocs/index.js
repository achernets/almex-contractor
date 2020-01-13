import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'components/LayoutApp';
import { getMrkDocuments, changeTextSearch } from 'redux/actions/mrkDocuments';
import UserMenu from 'components/UserMenu';
import { Row, Col, Button } from 'antd';
import { I18n } from 'react-redux-i18n';
import { actions } from 'react-redux-modals';
import { Input } from 'antd';

const HeaderDocs = ({ showModal, isFetching, getMrkDocuments, changeTextSearch, searchText }) => <Header >
  <Row type="flex" justify="space-between" align="middle">
    <Col span={12}>
    </Col>
    <Col span={12}>
      <Row type="flex" justify="end" align="middle" gutter={[16, 0]}>
        <Col>
          <Button type="primary"
            disabled={isFetching}
            onClick={() => showModal('MODAL_CREATE_MRK_DOCUMENT', {
              mrkDocument: null
            })}>
            {I18n.t('MrkDocuments.create')}
          </Button>
        </Col>
        <Col>
          <Input.Search
            value={searchText}
            onChange={e => changeTextSearch(e.target.value)}
            onSearch={() => getMrkDocuments()}
            placeholder={I18n.t('MrkDocuments.name')}
            disabled={isFetching}
          />
        </Col>
        <Col>
          <UserMenu />
        </Col>
      </Row>
    </Col>
  </Row>
</Header>;

const mapStateToProps = state => ({
  searchText: state.mrkDocuments.searchText,
  isFetching: state.mrkDocuments.isFetching
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showModal: actions.showModal,
      getMrkDocuments,
      changeTextSearch
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDocs);