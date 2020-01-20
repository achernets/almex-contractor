import React from 'react';
import { map, get } from 'lodash';
import Information from '../Information';
import { Timeline, Typography, Icon, Row, Col } from 'antd';
import moment from 'moment';
import Paragraph from 'components/Paragraph';
import * as styles from '../../mrkDocument.module.scss';
const Chain = ({ chain, activeChain, changeChain, loadChainId }) => {
  return <Timeline className={styles.timeline}>
    {map(chain, item => <Timeline.Item
      dot={loadChainId === item.id ? <Icon type="loading" /> : null}
      key={item.id}
      className={get(activeChain, 'document.id', null) === item.id ? 'active' : ''}
    >
      <Row className={styles.timeline_item_title} onClick={() => changeChain(get(activeChain, 'document.id', null) === item.id ? null : item.id)}>
        <Col span={19}>
          <Paragraph
            strong={get(activeChain, 'document.id', null) === item.id}
            ellipsis={{ rows: get(activeChain, 'document.id', null) === item.id ? null : 2, expandable: get(activeChain, 'document.id', null) !== item.id }}>
            {item.name}
          </Paragraph>
        </Col>
        <Col span={5}>
          <Typography.Text className={styles.timeline_item_date}>
            {moment(item.createDate).format('DD.MM.YYYY HH:mm')}
            <Icon type={get(activeChain, 'document.id', null) === item.id ? 'caret-up' : 'caret-down'} />
          </Typography.Text>
        </Col>
      </Row>
      {get(activeChain, 'document.id', null) === item.id && <div className={styles.timeline_item_content}><Information mrkDocumentData={activeChain} /></div>}
    </Timeline.Item>)}
  </Timeline>;
};

export default Chain;