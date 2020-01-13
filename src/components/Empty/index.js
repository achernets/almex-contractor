import React from 'react';
import { Empty as AEmpty } from 'antd';
import classnames from 'classnames';
import * as styles from './empty.module.scss';

const Empty = ({ className, children, ...props }) => {
  return <AEmpty className={classnames(styles.empty, className)} {...props}>{children}</AEmpty>;
};

export default Empty;
