import React from 'react';
import { Icon } from 'antd';
import { ECP } from 'constants/img';
import * as styles from './icons.module.scss';

const Close = (props) => <Icon type={'close'}
  className={styles.close}
  {...props}
/>;

const Ecp = (props) => <Icon
  component={() => <img src={ECP} alt={'ECP'} />}
  className={styles.ecp}
  {...props}
/>;

export {
  Close,
  Ecp
};
