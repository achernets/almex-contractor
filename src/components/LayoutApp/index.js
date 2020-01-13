import React from 'react';
import { Layout } from 'antd';
import classnames from 'classnames';
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

export {
  LayoutApp,
  SubLayout,
  Header
};