import React from 'react';
import { Typography, Row, Col } from 'antd';
import * as styles from '../right-preview.module.scss';

const InfoRow = ({ title, text, leftColWidth = 10 }) => <Row gutter={[0, 8]} >
  <Col span={leftColWidth}>
    <Typography.Text className={styles.infoLeft} >{title}</Typography.Text>
  </Col>
  <Col span={24 - leftColWidth}>
    <Typography.Text className={styles.infoRight} >{text}</Typography.Text>
  </Col>
</Row>;

export default InfoRow;