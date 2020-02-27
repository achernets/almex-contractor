import React from 'react';
import { isEmpty } from 'lodash';
import { Typography, Row, Col } from 'antd';
import * as styles from '../right-preview.module.scss';

const InfoRow = ({ title, text, leftColWidth = 10, gutter = [0, 8] }) => !isEmpty(text) ? <Row gutter={gutter} >
  <Col span={leftColWidth}>
    <Typography.Text className={styles.infoLeft} >{title}</Typography.Text>
  </Col>
  <Col span={24 - leftColWidth}>
    <Typography.Text className={styles.infoRight} >{text}</Typography.Text>
  </Col>
</Row> : null;

export default InfoRow;