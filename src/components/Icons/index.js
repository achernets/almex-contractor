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

const Chain = (props) => <Icon type={'link'}
  className={styles.chain}
  {...props}
/>;

const CaretUp = (props) => <Icon
  type={'caret-up'}
  className={styles.caret}
  {...props}
/>;

const CaretDown = (props) => <Icon
  type={'caret-down'}
  className={styles.caret}
  {...props}
/>;

export {
  Close,
  Ecp,
  Chain,
  CaretUp,
  CaretDown
};
