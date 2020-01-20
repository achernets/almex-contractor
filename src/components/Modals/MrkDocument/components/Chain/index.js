import React from 'react';
import { map, get } from 'lodash';
import Information from '../Information';
import { Timeline, Typography, Icon, Row, Col } from 'antd';
import moment from 'moment';
import Paragraph from 'components/Paragraph';
import * as styles from '../../mrkDocument.module.scss';
const Chain = ({ chain, activeChain, changeChain }) => {
  return <Timeline className={styles.timeline}>
    {map(chain, (item, index) => <Timeline.Item key={item.id} className={get(activeChain, 'document.id', null) === item.id ? 'active' : ''}>
      <Row className={styles.timeline_item_title}>
        <Col span={19}>
          <Paragraph
            onClick={() => changeChain(get(activeChain, 'document.id', null) === item.id ? null : item.id)}
            strong={get(activeChain, 'document.id', null) === item.id}
            ellipsis={{ rows: get(activeChain, 'document.id', null) === item.id ? null : 2, expandable: get(activeChain, 'document.id', null) !== item.id }}>
            {item.name}
          </Paragraph>
        </Col>
        <Col span={5}>
          <Typography.Text style={{ fontSize: 12, color: '#8c8c8c' }}>{moment(item.createDate).format('DD.MM.YYYY HH:mm')}<Icon style={{ paddingLeft: 4 }} type={get(activeChain, 'document.id', null) === item.id ? 'caret-up' : 'caret-down'} /></Typography.Text>
        </Col>
      </Row>
      {get(activeChain, 'document.id', null) === item.id && <div style={{ marginBottom: 24, marginTop: 8 }}><Information mrkDocumentData={activeChain} /></div>}
    </Timeline.Item>)}
  </Timeline>;
};

export default Chain;