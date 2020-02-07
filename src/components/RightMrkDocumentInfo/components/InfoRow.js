import React from 'react';
import { Typography, Col } from 'antd';

const InfoRow = ({ title, text, leftColWidth = 10 }) => <>
  <Col span={leftColWidth}>
    <Typography.Text style={{ color: '#8c8c8c', fontFamily: 'SFUIText Regular' }} >{title}</Typography.Text>
  </Col>
  <Col span={24 - leftColWidth}>
    <Typography.Text style={{ color: '#595959', fontFamily: 'SFUIText Regular' }} >{text}</Typography.Text>
  </Col>
</>;

export default InfoRow;