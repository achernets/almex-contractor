import React from 'react';
import { Icon } from 'antd';
import * as styles from './icons.module.scss';
const Close = (props) => <Icon type={'close'}
  className={styles.close}
  {...props}
/>;

export {
  Close
};
