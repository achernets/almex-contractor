import React from 'react';
import { Layout } from 'antd';
import classnames from 'classnames';
import { LOGO } from 'constants/img';
import UserMenu from 'components/UserMenu';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import * as styles from './layout-app.module.scss';
const { Content } = Layout;

const LayoutApp = ({ children }) => <Layout className={styles.layuot_app}>
  {children}
</Layout>;

const SubLayout = ({ children }) => <Layout className={styles.layuot_sub}>
  <Content>
    {children}
  </Content>
</Layout>;

const Header = ({ children, className }) => <Layout.Header className={classnames(className, styles.header)}>{children}</Layout.Header>;

const HeaderLogo = ({ children, className }) =>
  <Layout.Header className={classnames(className, styles.header)}>
    <Row type="flex" justify="space-between" align="middle">
      <Col span={12}>
        <Link to="/mrkDocuments"><img src={LOGO} alt="logo" /></Link>
      </Col>
      <Col span={12}>
        <Row type="flex" justify="end" align="middle" gutter={[16, 0]}>
          <UserMenu />
        </Row>
      </Col>
    </Row>
    {children}
  </Layout.Header>;

export {
  LayoutApp,
  SubLayout,
  Header,
  HeaderLogo
};