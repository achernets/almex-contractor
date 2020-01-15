import React from 'react';
import { Layout, Row, Col } from 'antd';
import * as styles from './signin.module.scss';
import Languages from './components/Languages';
import FormData from './components/FormData';
import { LOGO } from 'constants/img';

const { Content } = Layout;
const SignIn = () => <Layout className={styles.container}>
  <Content className={styles.wrapper}>
    <Row className={styles.content} gutter={[0, 16]}>
      <Col>
        <img src={LOGO} alt="logo" />
      </Col>
      <Col>
        <Languages />
      </Col>
      <Col>
        <FormData />
      </Col>
    </Row>
  </Content>
</Layout>;

export default SignIn;