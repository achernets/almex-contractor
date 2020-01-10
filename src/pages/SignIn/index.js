import React from 'react';
import { Layout, Row } from 'antd';
import * as styles from './signin.module.scss';
import Languages from './components/Languages';
import Logo from './components/Logo';
import FormData from './components/FormData';

const { Content } = Layout;
const SignIn = () => <Layout className={styles.container}>
  <Content className={styles.wrapper}>
    <Row className={styles.content}>
      <Logo />
      <Languages />
      <FormData />
    </Row>
  </Content>
</Layout>;

export default SignIn;