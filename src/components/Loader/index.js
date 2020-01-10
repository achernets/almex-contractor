import React from 'react';
import * as styles from './loader.module.scss';
import { Spin } from 'antd';
const Loader = () => (
  <div className={styles.loader}>
    <Spin />
  </div>
);
export default Loader;
