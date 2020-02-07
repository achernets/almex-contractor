import React from 'react';
import { Typography, Row, Col } from 'antd';
import * as styles from '../right-preview.module.scss';

const TitleBlock = ({ text, children }) => <>
  {!children ?
    <Typography.Text className={styles.titleLeft} >{text}</Typography.Text>
    : <Row gutter={[0, 8]}>
      <Col span={12}>
        <Typography.Text className={styles.titleLeft} >{text}</Typography.Text>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {children}
      </Col>
    </Row>}
</>;

export default TitleBlock;