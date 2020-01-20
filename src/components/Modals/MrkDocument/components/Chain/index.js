import React from 'react';
import { map, get } from 'lodash';
import Information from '../Information';
import { Timeline, Typography, Button } from 'antd';
import * as styles from '../../mrkDocument.module.scss';
const Chain = ({ chain, activeChain, changeChain }) => {
  return <Timeline className={styles.timeline}>
    {map(chain, item => <Timeline.Item key={item.id} className={get(activeChain, 'document.id', null) === item.id ? 'active' : ''}>
      <Typography.Text strong={get(activeChain, 'document.id', null) === item.id} ellipsis>{`${item.id} - ${item.name}`}</Typography.Text>
      {get(activeChain, 'document.id', null) !== item.id && <Button size="small" type="link" onClick={() => changeChain(item.id)}>Читать дальше</Button>}
      {get(activeChain, 'document.id', null) === item.id && <div style={{ marginTop: 24 }}><Information mrkDocumentData={activeChain} /></div>}
    </Timeline.Item>)}
  </Timeline>;
};

export default Chain;