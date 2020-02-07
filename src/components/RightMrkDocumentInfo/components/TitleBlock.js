import React from 'react';
import { Typography, Row, Col } from 'antd';

const TitleBlock = ({ text, children }) => <>
  {!children ?
    <Typography.Text style={{ color: '#262626', fontFamily: 'SFUIText Medium' }} >{text}</Typography.Text>
    : <Row gutter={[0, 8]}>
      <Col span={12}>
        <Typography.Text style={{ color: '#262626', fontFamily: 'SFUIText Medium' }} >{text}</Typography.Text>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {children}
      </Col>
    </Row>}
</>;

export default TitleBlock;