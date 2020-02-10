import React from 'react';
import { map, get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeChain } from 'redux/actions/mrkDocument';
import MrkDocumentView from './MrkDocumentView';
import { Timeline, Typography, Icon, Row, Col } from 'antd';
import { CaretUp, CaretDown } from 'components/Icons';
import moment from 'moment';
import Paragraph from 'components/Paragraph';
import * as styles from '../right-preview.module.scss';

const MrkDocumentChain = ({ mrkAttachment, selectedAttachment, changeChain, chain, activeChain, loadChainId }) => {

  return (<Col span={24}>
    <Timeline >
      {map(chain, item => <Timeline.Item
        dot={loadChainId === item.id ? <Icon type="loading" /> : null}
        key={item.id}
        className={get(activeChain, 'document.id', null) === item.id ? styles.timeline_active : ''}
      >
        <Row className={styles.timeline_item_title}>
          <Col span={15}>
            <Paragraph
              onClick={() => changeChain(get(activeChain, 'document.id', null) === item.id ? null : item.id)}
              strong={get(activeChain, 'document.id', null) === item.id}
              ellipsis={{ rows: get(activeChain, 'document.id', null) === item.id ? null : 2, expandable: get(activeChain, 'document.id', null) !== item.id }}
            >
              {item.name}
            </Paragraph>
          </Col>
          <Col span={8}>
            <Typography.Text
              onClick={() => changeChain(get(activeChain, 'document.id', null) === item.id ? null : item.id)}
            >
              {moment(item.createDate).format('DD.MM.YYYY HH:mm')}
              {get(activeChain, 'document.id', null) === item.id ? <CaretUp
                onClick={() => changeChain(get(activeChain, 'document.id', null) === item.id ? null : item.id)}
              /> : <CaretDown
                  onClick={() => changeChain(get(activeChain, 'document.id', null) === item.id ? null : item.id)}
                />}
            </Typography.Text>
          </Col>
        </Row>
        {get(activeChain, 'document.id', null) === item.id && <Row gutter={[0, 16]}>
          <MrkDocumentView
            mrkDocumentData={activeChain}
            mrkAttachment={mrkAttachment}
            selectedAttachment={selectedAttachment}
          />
        </Row>}
      </Timeline.Item>)}
    </Timeline>
  </Col>
  );
};


const mapStateToProps = state => ({
  activeChain: state.mrkDocument.activeChain,
  loadChainId: state.mrkDocument.loadChainId,
  chain: state.mrkDocument.chain
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeChain,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MrkDocumentChain);